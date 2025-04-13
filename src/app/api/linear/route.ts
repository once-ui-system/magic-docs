import { NextResponse } from 'next/server';
import { useLinearPublicLabels, specificTeams, teamNameorID } from '@/app/resources/roadmap';

// Linear API endpoint - handles server-side requests to Linear
export async function GET() {
  const apiKey = process.env.LINEAR_API_KEY;
  
  if (!apiKey) {
    console.log('Linear integration: API key not configured in environment variables');
    return NextResponse.json({ 
      error: 'Linear API key not configured',
      data: null
    }, { status: 500 });
  }
  
  try {
    console.log('Linear integration: Fetching data from Linear API');
    
    // First, fetch just the teams
    const teamsQuery = `
      query {
        teams {
          nodes {
            id
            name
            key
          }
        }
      }
    `;
    
    // Make the request to Linear's GraphQL API to get teams
    const teamsResponse = await fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify({ query: teamsQuery }),
      cache: 'no-store'
    });
    
    if (!teamsResponse.ok) {
      const errorText = await teamsResponse.text();
      console.error(`Linear API HTTP error: ${teamsResponse.status} ${teamsResponse.statusText}`);
      console.error('Linear API error response:', errorText);
      
      return NextResponse.json({ 
        error: `Linear API returned status code ${teamsResponse.status}`,
        details: errorText,
        data: null
      }, { status: 500 });
    }
    
    const teamsResult = await teamsResponse.json();
    
    if (teamsResult.errors) {
      console.error('Linear API GraphQL errors:', JSON.stringify(teamsResult.errors, null, 2));
      return NextResponse.json({ 
        error: 'GraphQL error fetching teams from Linear',
        details: teamsResult.errors[0]?.message || 'Unknown GraphQL error',
        data: null
      }, { status: 500 });
    }
    
    if (!teamsResult.data?.teams?.nodes || teamsResult.data.teams.nodes.length === 0) {
      console.log('No teams found in Linear workspace');
      return NextResponse.json({ 
        data: [],
        source: 'linear'
      });
    }
    
    let teams = teamsResult.data.teams.nodes;
    console.log(`Found ${teams.length} teams in Linear workspace`);
    
    // Filter teams if specificTeams is enabled
    if (specificTeams && Array.isArray(teamNameorID) && teamNameorID.length > 0) {
      console.log(`Filtering teams to only include: ${teamNameorID.join(', ')}`);
      teams = teams.filter(team => {
        // Check if team name, key (ID), or id matches any in the teamNameorID array
        return teamNameorID.some(nameOrId => {
          const teamNameLower = team.name?.toLowerCase();
          const teamKeyLower = team.key?.toLowerCase();
          const nameOrIdLower = nameOrId.toLowerCase();
          
          return teamNameLower === nameOrIdLower || teamKeyLower === nameOrIdLower || team.id === nameOrId;
        });
      });
      
    }
    
    // Initialize structure to hold all team data with their issues
    const roadmapData = [];
    
    // For each team, fetch their issues separately to reduce query complexity
    for (const team of teams) {
      // Create basic team entry
      const teamEntry = {
        product: team.name || 'Unnamed Team',
        brand: (team.key || 'team').toLowerCase(),
        columns: [
          { title: 'Planned', tasks: [] },
          { title: 'In Progress', tasks: [] },
          { title: 'Completed', tasks: [] }
        ]
      };
      
      // Query to fetch just this team's issues
      const issuesQuery = `
        query {
          team(id: "${team.id}") {
            issues(first: 100) {
              nodes {
                id
                title
                identifier
                description
                state {
                  name
                }
                assignee {
                  name
                  email
                  avatarUrl
                }
                labels {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      `;
      
      try {
        // Fetch issues for this team
        const issuesResponse = await fetch('https://api.linear.app/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey,
          },
          body: JSON.stringify({ query: issuesQuery }),
          cache: 'no-store'
        });
        
        if (!issuesResponse.ok) {
          console.error(`Error fetching issues for team ${team.name}: ${issuesResponse.status}`);
          continue; // Skip this team but continue processing others
        }
        
        const issuesResult = await issuesResponse.json();
        
        if (issuesResult.errors) {
          console.error(`GraphQL error fetching issues for team ${team.name}:`, issuesResult.errors);
          continue; // Skip this team but continue processing others
        }
        
        const issues = issuesResult.data?.team?.issues?.nodes || [];
        console.log(`Found ${issues.length} issues for team ${team.name}`);
        
        if (issues.length === 0) {
          continue; // Skip teams with no issues
        }
        
        // Process issues using our mapping logic
        processTeamIssues(teamEntry, issues);
        
        // Only add teams that have at least one task in any column
        if (teamEntry.columns.some(col => col.tasks.length > 0)) {
          roadmapData.push(teamEntry);
        }
      } catch (teamError) {
        console.error(`Error processing team ${team.name}:`, teamError);
        // Continue with other teams
      }
    }
    
    if (roadmapData.length === 0) {
      console.log('No roadmap data available from Linear after processing');
    } else {
      console.log(`Linear integration: Processed ${roadmapData.length} teams for roadmap`);
    }
    
    return NextResponse.json({ 
      data: roadmapData,
      source: 'linear'
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error('Linear integration unhandled error:', errorMessage);
    console.error(errorStack);
    
    return NextResponse.json({ 
      error: 'Failed to fetch data from Linear',
      details: errorMessage,
      data: null
    }, { status: 500 });
  }
}

// Process issues for a team and populate the columns
function processTeamIssues(teamEntry: any, issues: any[]) {
  // Define states we want to map to columns
  const stateMapping: {[key: string]: string | null} = {
    'Backlog': 'Planned',
    'Todo': 'Planned',
    'To Do': 'Planned',
    'Planning': 'Planned',
    'In Progress': 'In Progress',
    'In Review': 'In Progress',
    'Ready for Review': 'In Progress',
    'Testing': 'In Progress',
    'Done': 'Completed',
    'Completed': 'Completed',
    'Finished': 'Completed',
    'Canceled': null, // Skip canceled items
    'Cancelled': null  // Skip canceled items (UK spelling)
  };
  
  // Process each issue
  issues.forEach((issue: any) => {
    // When useLinearPublicLabels is true, only show issues with a "public" label
    if (useLinearPublicLabels) {
        // Check if issue has the "public" label
        const hasPublicLabel = issue.labels?.nodes?.some(
              (label: any) => label?.name === 'Public'
        );
            
        // Skip this issue if it doesn't have the public label
        if (!hasPublicLabel) return;
    }
          
    try {
      // Skip issues without title
      if (!issue.title) return;
      
      // Get the state name
      const stateName = issue.state?.name;
      if (!stateName) return;
      
      // Check if we have a mapping for this state
      const columnName = stateMapping[stateName];
      if (columnName === null) return; // Skip explicitly excluded states
      
      // Default to "Planned" if unknown state
      const targetColumnName = columnName || 'Planned';
      
      // Find type based on issue labels
      let issueType = "improvement";
      if (issue.labels && issue.labels.nodes) {
        for (const label of issue.labels.nodes) {
          if (!label?.name) continue;
          
          const lowerLabel = label.name.toLowerCase();
          if (lowerLabel.includes('bug')) issueType = "bug";
          else if (lowerLabel.includes('feature')) issueType = "feature";
          else if (lowerLabel.includes('doc')) issueType = "documentation";
          else if (lowerLabel.includes('perf')) issueType = "performance";
          else if (lowerLabel.includes('security')) issueType = "security";
        }
      }
      
      // Create task object
      const taskObject: {
        title: string;
        description?: string;
        type: string;
        user?: {
          name: string;
          avatar?: string;
        };
      } = {
        title: issue.title,
        type: issueType,
      };
      
      // Only add description if one exists
      if (issue.description) {
        taskObject.description = issue.description;
      }
      
      // Add assignee if available
      if (issue.assignee && issue.assignee.name) {
        taskObject.user = {
          name: issue.assignee.name || issue.assignee.email || 'Unnamed User',
        };
        
        if (issue.assignee.avatarUrl) {
          taskObject.user.avatar = issue.assignee.avatarUrl;
        }
      }
      
      // Add to the appropriate column
      const targetColumn = teamEntry.columns.find((col: any) => col.title === targetColumnName);
      if (targetColumn) {
        targetColumn.tasks.push(taskObject);
      }
    } catch (issueError) {
      // Log and skip problematic issues instead of failing the entire process
      console.error('Error processing Linear issue:', issueError);
    }
  });
}