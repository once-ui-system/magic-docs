import { IconType } from "react-icons";

import {
  HiOutlineLink,
  HiOutlineAcademicCap,
  HiOutlineQueueList,
  HiOutlineIdentification,
  HiOutlineMap,
  HiOutlineClock,
  HiOutlineAdjustmentsHorizontal,
  HiOutlinePaintBrush,
  HiOutlineDocumentDuplicate,
  HiOutlineDocumentText,
  HiOutlineSquare3Stack3D,
  HiOutlineCube,
  HiOutlineKey,
} from "react-icons/hi2";

import { RiVisaLine } from "react-icons/ri";

import { FaDiscord, FaGithub, FaGoogle, FaLinkedin, FaMailchimp, FaThreads } from "react-icons/fa6";

export const iconLibrary = {
  openLink: HiOutlineLink,
  discord: FaDiscord,
  google: FaGoogle,
  github: FaGithub,
  visa: RiVisaLine,
  linkedin: FaLinkedin,
  threads: FaThreads,
  scholar: HiOutlineAcademicCap,
  queue: HiOutlineQueueList,
  card: HiOutlineIdentification,
  roadmap: HiOutlineMap,
  changelog: HiOutlineClock,
  config: HiOutlineAdjustmentsHorizontal,
  mailchimp: FaMailchimp,
  style: HiOutlinePaintBrush,
  pages: HiOutlineDocumentDuplicate,
  learn: HiOutlineAcademicCap,
  page: HiOutlineDocumentText,
  project: HiOutlineSquare3Stack3D,
  article: HiOutlineQueueList,
  components: HiOutlineCube,
  password: HiOutlineKey,
} satisfies Record<string, IconType>;

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;

// Teach Once UI the names registered above, so `<Icon name="rocket" />` type-checks.
declare module "@once-ui-system/core" {
  interface IconLibraryOverrides extends Record<keyof typeof iconLibrary, true> {}
}
