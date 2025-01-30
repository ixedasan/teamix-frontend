import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AttachmentModel = {
  __typename?: 'AttachmentModel';
  createdAt: Scalars['DateTime']['output'];
  filename: Scalars['String']['output'];
  filepath: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  taskId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AuthModel = {
  __typename?: 'AuthModel';
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserModel>;
};

export type ChangeDocumentInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeEmailInput = {
  email: Scalars['String']['input'];
};

export type ChangeNotificationSettingsInput = {
  siteNotification: Scalars['Boolean']['input'];
  telegramNotification: Scalars['Boolean']['input'];
};

export type ChangeNotificationsSettingsResponse = {
  __typename?: 'ChangeNotificationsSettingsResponse';
  notificationSettings: NotificationSettingsModel;
  telegramAuthToken?: Maybe<Scalars['String']['output']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ChangeProfileInfoInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ChangeRoleInput = {
  role: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ChangeStatusInput = {
  status?: InputMaybe<TaskStatus>;
  taskId: Scalars['ID']['input'];
};

export type CommentModel = {
  __typename?: 'CommentModel';
  author: UserModel;
  authorId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  taskId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateDocumentInput = {
  title: Scalars['String']['input'];
};

export type CreateLabelInput = {
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeviceModel = {
  __typename?: 'DeviceModel';
  browser: Scalars['String']['output'];
  os: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DocumentModel = {
  __typename?: 'DocumentModel';
  content: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  projectId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EnableTotpInput = {
  pin: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type InviteMemberInput = {
  email: Scalars['String']['input'];
  role: Role;
};

export type LocationModel = {
  __typename?: 'LocationModel';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type MakePaymentModel = {
  __typename?: 'MakePaymentModel';
  url: Scalars['String']['output'];
};

export type MemberModel = {
  __typename?: 'MemberModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  project: ProjectModel;
  projectId: Scalars['ID']['output'];
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptProjectInvitation: Scalars['Boolean']['output'];
  addLabelToTask: Scalars['Boolean']['output'];
  assignTask: Scalars['Boolean']['output'];
  changeDocument: DocumentModel;
  changeEmail: Scalars['Boolean']['output'];
  changeMemberRole: Scalars['Boolean']['output'];
  changeNotificationsSettings: ChangeNotificationsSettingsResponse;
  changePassword: Scalars['Boolean']['output'];
  changeProfileAvatar: Scalars['Boolean']['output'];
  changeProfileInfo: Scalars['Boolean']['output'];
  changeProjectCover: Scalars['Boolean']['output'];
  changeProjectInfo: Scalars['Boolean']['output'];
  changeTaskStatus: TaskModel;
  clearSessionCookie: Scalars['Boolean']['output'];
  createDocument: Scalars['Boolean']['output'];
  createProject: ProjectModel;
  createSocialLink: Scalars['Boolean']['output'];
  createTask: TaskModel;
  createTaskLabel: Scalars['Boolean']['output'];
  createTaskLink: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deleteComment: Scalars['Boolean']['output'];
  deleteDocument: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteTask: TaskModel;
  deleteTaskAttachment: Scalars['Boolean']['output'];
  deleteTaskLabel: Scalars['Boolean']['output'];
  deleteTaskLink: Scalars['Boolean']['output'];
  disableTotp: Scalars['Boolean']['output'];
  enableTotp: Scalars['Boolean']['output'];
  generateAttachmentDownloadUrl: Scalars['String']['output'];
  inviteProjectMember: Scalars['Boolean']['output'];
  loginUser: AuthModel;
  logoutUser: Scalars['Boolean']['output'];
  makePayment: MakePaymentModel;
  newPassword: Scalars['Boolean']['output'];
  removeLabelFromTask: Scalars['Boolean']['output'];
  removeProfileAvatar: Scalars['Boolean']['output'];
  removeProjectCover: Scalars['Boolean']['output'];
  removeProjectMember: Scalars['Boolean']['output'];
  removeSession: Scalars['Boolean']['output'];
  removeSocialLink: Scalars['Boolean']['output'];
  reorderSocialLink: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  sendComment: CommentModel;
  setCurrentProject: Scalars['Boolean']['output'];
  unassignTask: Scalars['Boolean']['output'];
  updateSocialLink: Scalars['Boolean']['output'];
  updateTask: TaskModel;
  updateTaskLink: Scalars['Boolean']['output'];
  uploadTaskAttachment: Scalars['Boolean']['output'];
  verifyAccaunt: AuthModel;
};


export type MutationAcceptProjectInvitationArgs = {
  token: Scalars['String']['input'];
};


export type MutationAddLabelToTaskArgs = {
  labelId: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
};


export type MutationAssignTaskArgs = {
  taskId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationChangeDocumentArgs = {
  documentId: Scalars['String']['input'];
  input: ChangeDocumentInput;
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangeMemberRoleArgs = {
  data: ChangeRoleInput;
};


export type MutationChangeNotificationsSettingsArgs = {
  data: ChangeNotificationSettingsInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationChangeProfileAvatarArgs = {
  avatar: Scalars['Upload']['input'];
};


export type MutationChangeProfileInfoArgs = {
  data: ChangeProfileInfoInput;
};


export type MutationChangeProjectCoverArgs = {
  cover: Scalars['Upload']['input'];
};


export type MutationChangeProjectInfoArgs = {
  data: ProjectInput;
};


export type MutationChangeTaskStatusArgs = {
  input: ChangeStatusInput;
};


export type MutationCreateDocumentArgs = {
  data: CreateDocumentInput;
};


export type MutationCreateProjectArgs = {
  data: ProjectInput;
};


export type MutationCreateSocialLinkArgs = {
  data: SocialLinkInput;
};


export type MutationCreateTaskArgs = {
  input: TaskInput;
};


export type MutationCreateTaskLabelArgs = {
  input: CreateLabelInput;
};


export type MutationCreateTaskLinkArgs = {
  input: TaskLinkInput;
  taskId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationDeleteDocumentArgs = {
  documentId: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['String']['input'];
};


export type MutationDeleteTaskAttachmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskLabelArgs = {
  labelId: Scalars['String']['input'];
};


export type MutationDeleteTaskLinkArgs = {
  linkId: Scalars['String']['input'];
};


export type MutationEnableTotpArgs = {
  data: EnableTotpInput;
};


export type MutationGenerateAttachmentDownloadUrlArgs = {
  id: Scalars['String']['input'];
};


export type MutationInviteProjectMemberArgs = {
  data: InviteMemberInput;
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationNewPasswordArgs = {
  data: NewPasswordInput;
};


export type MutationRemoveLabelFromTaskArgs = {
  labelId: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
};


export type MutationRemoveProjectMemberArgs = {
  userId: Scalars['String']['input'];
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSocialLinkArgs = {
  id: Scalars['String']['input'];
};


export type MutationReorderSocialLinkArgs = {
  list: Array<SocialLinkOrderInput>;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSendCommentArgs = {
  input: SendCommentInput;
};


export type MutationSetCurrentProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationUnassignTaskArgs = {
  taskId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUpdateSocialLinkArgs = {
  data: SocialLinkInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateTaskArgs = {
  input: TaskInput;
  taskId: Scalars['String']['input'];
};


export type MutationUpdateTaskLinkArgs = {
  input: TaskLinkInput;
  linkId: Scalars['String']['input'];
};


export type MutationUploadTaskAttachmentArgs = {
  file: Scalars['Upload']['input'];
  taskId: Scalars['String']['input'];
};


export type MutationVerifyAccauntArgs = {
  data: VerificationInput;
};

export type NewPasswordInput = {
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NotificationModel = {
  __typename?: 'NotificationModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type NotificationSettingsModel = {
  __typename?: 'NotificationSettingsModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  siteNotification: Scalars['Boolean']['output'];
  telegramNotification: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export enum NotificationType {
  EnableTwoFactor = 'ENABLE_TWO_FACTOR',
  ProjectInvitation = 'PROJECT_INVITATION',
  TaskAssigned = 'TASK_ASSIGNED',
  TaskComment = 'TASK_COMMENT',
  TaskOverdue = 'TASK_OVERDUE'
}

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  None = 'NONE',
  Urgent = 'URGENT'
}

export type ProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ProjectModel = {
  __typename?: 'ProjectModel';
  cover?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  labels: Array<TaskLabelModel>;
  members: Array<MemberModel>;
  name: Scalars['String']['output'];
  plan: ProjectPlan;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ProjectPlan {
  Enterprise = 'ENTERPRISE',
  Free = 'FREE',
  Pro = 'PRO'
}

export type Query = {
  __typename?: 'Query';
  findAllTasks: Array<TaskModel>;
  findCommentsByTask: Array<CommentModel>;
  findCurrentSession: SessionModel;
  findDocument: DocumentModel;
  findDocumentsByProject: Array<DocumentModel>;
  findNotificationsByUser: Array<NotificationModel>;
  findNotificationsUnreadCount: Scalars['Float']['output'];
  findProfile: UserModel;
  findProjectById: ProjectModel;
  findProjectMembers: Array<MemberModel>;
  findSessionsByUser: Array<SessionModel>;
  findSocialLinks: Array<SocialLinksModel>;
  findTask: TaskModel;
  findTaskAttachments: Array<AttachmentModel>;
  findTaskLabelsByProject: Array<TaskLabelModel>;
  findTaskLabelsByTask: Array<TaskLabelModel>;
  findTaskLinks: Array<TaskLinkModel>;
  generateTotpSecret: TotpModel;
  getAllUserProjects: Array<ProjectModel>;
  getTaskAssignees: Array<TaskAssigneeModel>;
};


export type QueryFindCommentsByTaskArgs = {
  taskId: Scalars['String']['input'];
};


export type QueryFindDocumentArgs = {
  documentId: Scalars['String']['input'];
};


export type QueryFindTaskArgs = {
  taskId: Scalars['String']['input'];
};


export type QueryFindTaskAttachmentsArgs = {
  taskId: Scalars['String']['input'];
};


export type QueryFindTaskLabelsByTaskArgs = {
  taskId: Scalars['String']['input'];
};


export type QueryFindTaskLinksArgs = {
  taskId: Scalars['String']['input'];
};


export type QueryGetTaskAssigneesArgs = {
  taskId: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
};

/** User role in project */
export enum Role {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Viewer = 'VIEWER'
}

export type SendCommentInput = {
  content: Scalars['String']['input'];
  taskId: Scalars['ID']['input'];
};

export type SessionMetadataModel = {
  __typename?: 'SessionMetadataModel';
  device: DeviceModel;
  ip: Scalars['String']['output'];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: SessionMetadataModel;
  projectId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type SocialLinkInput = {
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type SocialLinkOrderInput = {
  id: Scalars['String']['input'];
  position: Scalars['Float']['input'];
};

export type SocialLinksModel = {
  __typename?: 'SocialLinksModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  commentAdded: CommentModel;
  documentUpdated: DocumentModel;
  taskAdded: TaskModel;
  taskChanged: TaskModel;
  taskDeleted: TaskModel;
};


export type SubscriptionCommentAddedArgs = {
  taskId: Scalars['String']['input'];
};


export type SubscriptionDocumentUpdatedArgs = {
  projectId: Scalars['String']['input'];
};


export type SubscriptionTaskAddedArgs = {
  projectId: Scalars['String']['input'];
};


export type SubscriptionTaskChangedArgs = {
  projectId: Scalars['String']['input'];
};


export type SubscriptionTaskDeletedArgs = {
  projectId: Scalars['String']['input'];
};

export type TaskAssigneeModel = {
  __typename?: 'TaskAssigneeModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  task: TaskModel;
  taskId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['ID']['output'];
};

export type TaskInput = {
  assigneeId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  labelsIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  priority: Priority;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status: TaskStatus;
  title: Scalars['String']['input'];
};

export type TaskLabelModel = {
  __typename?: 'TaskLabelModel';
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  projectId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskLinkInput = {
  title?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type TaskLinkModel = {
  __typename?: 'TaskLinkModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  taskId: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type TaskModel = {
  __typename?: 'TaskModel';
  assignees: Array<TaskAssigneeModel>;
  comments: Array<CommentModel>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: UserModel;
  createdById: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  labels: Array<TaskLabelModel>;
  links: Array<TaskLinkModel>;
  priority: Priority;
  project: ProjectModel;
  projectId: Scalars['ID']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: TaskStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum TaskStatus {
  Backlog = 'BACKLOG',
  Cancelled = 'CANCELLED',
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type TotpModel = {
  __typename?: 'TotpModel';
  qrCodeUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isTotpEnabled: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  notificationSettings: NotificationSettingsModel;
  notifications: Array<NotificationModel>;
  password: Scalars['String']['output'];
  socialLinks: Array<SocialLinksModel>;
  telegramId?: Maybe<Scalars['String']['output']>;
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type VerificationInput = {
  token: Scalars['String']['input'];
};

export type TaskFragment = { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: boolean };

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', username: string } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type NewPasswordMutationVariables = Exact<{
  data: NewPasswordInput;
}>;


export type NewPasswordMutation = { __typename?: 'Mutation', newPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type VerifyAccauntMutationVariables = Exact<{
  data: VerificationInput;
}>;


export type VerifyAccauntMutation = { __typename?: 'Mutation', verifyAccaunt: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', isEmailVerified: boolean } | null } };

export type AcceptProjectInvitationMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type AcceptProjectInvitationMutation = { __typename?: 'Mutation', acceptProjectInvitation: boolean };

export type ChangeMemberRoleMutationVariables = Exact<{
  data: ChangeRoleInput;
}>;


export type ChangeMemberRoleMutation = { __typename?: 'Mutation', changeMemberRole: boolean };

export type ChangeProjectCoverMutationVariables = Exact<{
  data: Scalars['Upload']['input'];
}>;


export type ChangeProjectCoverMutation = { __typename?: 'Mutation', changeProjectCover: boolean };

export type ChangeProjectInfoMutationVariables = Exact<{
  data: ProjectInput;
}>;


export type ChangeProjectInfoMutation = { __typename?: 'Mutation', changeProjectInfo: boolean };

export type CreateLabelMutationVariables = Exact<{
  data: CreateLabelInput;
}>;


export type CreateLabelMutation = { __typename?: 'Mutation', createTaskLabel: boolean };

export type CreateProjectMutationVariables = Exact<{
  data: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectModel', id: string } };

export type DeleteProjectMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type InviteMemberMutationVariables = Exact<{
  data: InviteMemberInput;
}>;


export type InviteMemberMutation = { __typename?: 'Mutation', inviteProjectMember: boolean };

export type RemoveLabelMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveLabelMutation = { __typename?: 'Mutation', deleteTaskLabel: boolean };

export type RemoveProjectCoverMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProjectCoverMutation = { __typename?: 'Mutation', removeProjectCover: boolean };

export type RemoveProjectMemberMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type RemoveProjectMemberMutation = { __typename?: 'Mutation', removeProjectMember: boolean };

export type UpgrageProjectPlanMutationVariables = Exact<{ [key: string]: never; }>;


export type UpgrageProjectPlanMutation = { __typename?: 'Mutation', makePayment: { __typename?: 'MakePaymentModel', url: string } };

export type ChangeTaskStatusMutationVariables = Exact<{
  data: ChangeStatusInput;
}>;


export type ChangeTaskStatusMutation = { __typename?: 'Mutation', changeTaskStatus: { __typename?: 'TaskModel', id: string, status: TaskStatus } };

export type CreateTaskMutationVariables = Exact<{
  data: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'TaskModel', id: string } };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: TaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type ChangeEmailMutationVariables = Exact<{
  data: ChangeEmailInput;
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: boolean };

export type ChangeNotificationsSettingsMutationVariables = Exact<{
  data: ChangeNotificationSettingsInput;
}>;


export type ChangeNotificationsSettingsMutation = { __typename?: 'Mutation', changeNotificationsSettings: { __typename?: 'ChangeNotificationsSettingsResponse', telegramAuthToken?: string | null, notificationSettings: { __typename?: 'NotificationSettingsModel', siteNotification: boolean, telegramNotification: boolean } } };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ChangeProfileAvatarMutationVariables = Exact<{
  avatar: Scalars['Upload']['input'];
}>;


export type ChangeProfileAvatarMutation = { __typename?: 'Mutation', changeProfileAvatar: boolean };

export type ChangeProfileInfoMutationVariables = Exact<{
  data: ChangeProfileInfoInput;
}>;


export type ChangeProfileInfoMutation = { __typename?: 'Mutation', changeProfileInfo: boolean };

export type ClearSessionCookieMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSessionCookieMutation = { __typename?: 'Mutation', clearSessionCookie: boolean };

export type CreateSocialLinkMutationVariables = Exact<{
  data: SocialLinkInput;
}>;


export type CreateSocialLinkMutation = { __typename?: 'Mutation', createSocialLink: boolean };

export type DisableTotpMutationVariables = Exact<{ [key: string]: never; }>;


export type DisableTotpMutation = { __typename?: 'Mutation', disableTotp: boolean };

export type EnableTotpMutationVariables = Exact<{
  data: EnableTotpInput;
}>;


export type EnableTotpMutation = { __typename?: 'Mutation', enableTotp: boolean };

export type RemoveProfileAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfileAvatarMutation = { __typename?: 'Mutation', removeProfileAvatar: boolean };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', removeSession: boolean };

export type RemoveSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSocialLinkMutation = { __typename?: 'Mutation', removeSocialLink: boolean };

export type ReorderSocialLinksMutationVariables = Exact<{
  list: Array<SocialLinkOrderInput> | SocialLinkOrderInput;
}>;


export type ReorderSocialLinksMutation = { __typename?: 'Mutation', reorderSocialLink: boolean };

export type UpdateSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: SocialLinkInput;
}>;


export type UpdateSocialLinkMutation = { __typename?: 'Mutation', updateSocialLink: boolean };

export type FindProjectByIdQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProjectByIdQuery = { __typename?: 'Query', findProjectById: { __typename?: 'ProjectModel', id: string, name: string, icon?: string | null, description?: string | null, cover?: string | null, plan: ProjectPlan, members: Array<{ __typename?: 'MemberModel', id: string, userId: string, projectId: string, role: Role, createdAt: any, user: { __typename?: 'UserModel', username: string, displayName: string, avatar?: string | null, email: string } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type FindUserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserProjectsQuery = { __typename?: 'Query', getAllUserProjects: Array<{ __typename?: 'ProjectModel', id: string, name: string, icon?: string | null }> };

export type FindUserProjectsListQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserProjectsListQuery = { __typename?: 'Query', getAllUserProjects: Array<{ __typename?: 'ProjectModel', id: string, name: string, icon?: string | null, description?: string | null, cover?: string | null, members: Array<{ __typename?: 'MemberModel', role: Role, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }> }> };

export type FindAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllTasksQuery = { __typename?: 'Query', findAllTasks: Array<{ __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> }> };

export type FindCurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type FindCurrentSessionQuery = { __typename?: 'Query', findCurrentSession: { __typename?: 'SessionModel', id: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, location: { __typename?: 'LocationModel', country: string, city: string, latitude: number, longitude: number }, device: { __typename?: 'DeviceModel', browser: string, os: string } } } };

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { __typename?: 'Query', findProfile: { __typename?: 'UserModel', id: string, username: string, email: string, displayName: string, avatar?: string | null, bio?: string | null, isTotpEnabled: boolean, notificationSettings: { __typename?: 'NotificationSettingsModel', siteNotification: boolean, telegramNotification: boolean } } };

export type FindSessionsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSessionsByUserQuery = { __typename?: 'Query', findSessionsByUser: Array<{ __typename?: 'SessionModel', id: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, location: { __typename?: 'LocationModel', country: string, city: string, latitude: number, longitude: number }, device: { __typename?: 'DeviceModel', browser: string, os: string } } }> };

export type FindSocialLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSocialLinksQuery = { __typename?: 'Query', findSocialLinks: Array<{ __typename?: 'SocialLinksModel', id: string, title: string, url: string, position: number }> };

export type GenerateTotpSecretQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTotpSecretQuery = { __typename?: 'Query', generateTotpSecret: { __typename?: 'TotpModel', secret: string, qrCodeUrl: string } };

export type TaskAddedSubscriptionVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type TaskAddedSubscription = { __typename?: 'Subscription', taskAdded: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type TaskChangedSubscriptionVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type TaskChangedSubscription = { __typename?: 'Subscription', taskChanged: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type TaskDeletedSubscriptionVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type TaskDeletedSubscription = { __typename?: 'Subscription', taskDeleted: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export const TaskFragmentDoc = gql`
    fragment Task on TaskModel {
  id
  title
  description
  status
  priority
  startDate
  dueDate
  assignees {
    id
    user {
      id
      displayName
      avatar
    }
  }
  labels {
    id
    name
    color
  }
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginInput!) {
  loginUser(data: $data) {
    user {
      username
    }
    message
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const NewPasswordDocument = gql`
    mutation NewPassword($data: NewPasswordInput!) {
  newPassword(data: $data)
}
    `;
export type NewPasswordMutationFn = Apollo.MutationFunction<NewPasswordMutation, NewPasswordMutationVariables>;

/**
 * __useNewPasswordMutation__
 *
 * To run a mutation, you first call `useNewPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPasswordMutation, { data, loading, error }] = useNewPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewPasswordMutation(baseOptions?: Apollo.MutationHookOptions<NewPasswordMutation, NewPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPasswordMutation, NewPasswordMutationVariables>(NewPasswordDocument, options);
      }
export type NewPasswordMutationHookResult = ReturnType<typeof useNewPasswordMutation>;
export type NewPasswordMutationResult = Apollo.MutationResult<NewPasswordMutation>;
export type NewPasswordMutationOptions = Apollo.BaseMutationOptions<NewPasswordMutation, NewPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyAccauntDocument = gql`
    mutation VerifyAccaunt($data: VerificationInput!) {
  verifyAccaunt(data: $data) {
    user {
      isEmailVerified
    }
    message
  }
}
    `;
export type VerifyAccauntMutationFn = Apollo.MutationFunction<VerifyAccauntMutation, VerifyAccauntMutationVariables>;

/**
 * __useVerifyAccauntMutation__
 *
 * To run a mutation, you first call `useVerifyAccauntMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccauntMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccauntMutation, { data, loading, error }] = useVerifyAccauntMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyAccauntMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAccauntMutation, VerifyAccauntMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAccauntMutation, VerifyAccauntMutationVariables>(VerifyAccauntDocument, options);
      }
export type VerifyAccauntMutationHookResult = ReturnType<typeof useVerifyAccauntMutation>;
export type VerifyAccauntMutationResult = Apollo.MutationResult<VerifyAccauntMutation>;
export type VerifyAccauntMutationOptions = Apollo.BaseMutationOptions<VerifyAccauntMutation, VerifyAccauntMutationVariables>;
export const AcceptProjectInvitationDocument = gql`
    mutation AcceptProjectInvitation($token: String!) {
  acceptProjectInvitation(token: $token)
}
    `;
export type AcceptProjectInvitationMutationFn = Apollo.MutationFunction<AcceptProjectInvitationMutation, AcceptProjectInvitationMutationVariables>;

/**
 * __useAcceptProjectInvitationMutation__
 *
 * To run a mutation, you first call `useAcceptProjectInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptProjectInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptProjectInvitationMutation, { data, loading, error }] = useAcceptProjectInvitationMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAcceptProjectInvitationMutation(baseOptions?: Apollo.MutationHookOptions<AcceptProjectInvitationMutation, AcceptProjectInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptProjectInvitationMutation, AcceptProjectInvitationMutationVariables>(AcceptProjectInvitationDocument, options);
      }
export type AcceptProjectInvitationMutationHookResult = ReturnType<typeof useAcceptProjectInvitationMutation>;
export type AcceptProjectInvitationMutationResult = Apollo.MutationResult<AcceptProjectInvitationMutation>;
export type AcceptProjectInvitationMutationOptions = Apollo.BaseMutationOptions<AcceptProjectInvitationMutation, AcceptProjectInvitationMutationVariables>;
export const ChangeMemberRoleDocument = gql`
    mutation ChangeMemberRole($data: ChangeRoleInput!) {
  changeMemberRole(data: $data)
}
    `;
export type ChangeMemberRoleMutationFn = Apollo.MutationFunction<ChangeMemberRoleMutation, ChangeMemberRoleMutationVariables>;

/**
 * __useChangeMemberRoleMutation__
 *
 * To run a mutation, you first call `useChangeMemberRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeMemberRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeMemberRoleMutation, { data, loading, error }] = useChangeMemberRoleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeMemberRoleMutation(baseOptions?: Apollo.MutationHookOptions<ChangeMemberRoleMutation, ChangeMemberRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeMemberRoleMutation, ChangeMemberRoleMutationVariables>(ChangeMemberRoleDocument, options);
      }
export type ChangeMemberRoleMutationHookResult = ReturnType<typeof useChangeMemberRoleMutation>;
export type ChangeMemberRoleMutationResult = Apollo.MutationResult<ChangeMemberRoleMutation>;
export type ChangeMemberRoleMutationOptions = Apollo.BaseMutationOptions<ChangeMemberRoleMutation, ChangeMemberRoleMutationVariables>;
export const ChangeProjectCoverDocument = gql`
    mutation ChangeProjectCover($data: Upload!) {
  changeProjectCover(cover: $data)
}
    `;
export type ChangeProjectCoverMutationFn = Apollo.MutationFunction<ChangeProjectCoverMutation, ChangeProjectCoverMutationVariables>;

/**
 * __useChangeProjectCoverMutation__
 *
 * To run a mutation, you first call `useChangeProjectCoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProjectCoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProjectCoverMutation, { data, loading, error }] = useChangeProjectCoverMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeProjectCoverMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProjectCoverMutation, ChangeProjectCoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProjectCoverMutation, ChangeProjectCoverMutationVariables>(ChangeProjectCoverDocument, options);
      }
export type ChangeProjectCoverMutationHookResult = ReturnType<typeof useChangeProjectCoverMutation>;
export type ChangeProjectCoverMutationResult = Apollo.MutationResult<ChangeProjectCoverMutation>;
export type ChangeProjectCoverMutationOptions = Apollo.BaseMutationOptions<ChangeProjectCoverMutation, ChangeProjectCoverMutationVariables>;
export const ChangeProjectInfoDocument = gql`
    mutation ChangeProjectInfo($data: ProjectInput!) {
  changeProjectInfo(data: $data)
}
    `;
export type ChangeProjectInfoMutationFn = Apollo.MutationFunction<ChangeProjectInfoMutation, ChangeProjectInfoMutationVariables>;

/**
 * __useChangeProjectInfoMutation__
 *
 * To run a mutation, you first call `useChangeProjectInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProjectInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProjectInfoMutation, { data, loading, error }] = useChangeProjectInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeProjectInfoMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProjectInfoMutation, ChangeProjectInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProjectInfoMutation, ChangeProjectInfoMutationVariables>(ChangeProjectInfoDocument, options);
      }
export type ChangeProjectInfoMutationHookResult = ReturnType<typeof useChangeProjectInfoMutation>;
export type ChangeProjectInfoMutationResult = Apollo.MutationResult<ChangeProjectInfoMutation>;
export type ChangeProjectInfoMutationOptions = Apollo.BaseMutationOptions<ChangeProjectInfoMutation, ChangeProjectInfoMutationVariables>;
export const CreateLabelDocument = gql`
    mutation CreateLabel($data: CreateLabelInput!) {
  createTaskLabel(input: $data)
}
    `;
export type CreateLabelMutationFn = Apollo.MutationFunction<CreateLabelMutation, CreateLabelMutationVariables>;

/**
 * __useCreateLabelMutation__
 *
 * To run a mutation, you first call `useCreateLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLabelMutation, { data, loading, error }] = useCreateLabelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLabelMutation(baseOptions?: Apollo.MutationHookOptions<CreateLabelMutation, CreateLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLabelMutation, CreateLabelMutationVariables>(CreateLabelDocument, options);
      }
export type CreateLabelMutationHookResult = ReturnType<typeof useCreateLabelMutation>;
export type CreateLabelMutationResult = Apollo.MutationResult<CreateLabelMutation>;
export type CreateLabelMutationOptions = Apollo.BaseMutationOptions<CreateLabelMutation, CreateLabelMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($data: ProjectInput!) {
  createProject(data: $data) {
    id
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject {
  deleteProject
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const InviteMemberDocument = gql`
    mutation InviteMember($data: InviteMemberInput!) {
  inviteProjectMember(data: $data)
}
    `;
export type InviteMemberMutationFn = Apollo.MutationFunction<InviteMemberMutation, InviteMemberMutationVariables>;

/**
 * __useInviteMemberMutation__
 *
 * To run a mutation, you first call `useInviteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMemberMutation, { data, loading, error }] = useInviteMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInviteMemberMutation(baseOptions?: Apollo.MutationHookOptions<InviteMemberMutation, InviteMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteMemberMutation, InviteMemberMutationVariables>(InviteMemberDocument, options);
      }
export type InviteMemberMutationHookResult = ReturnType<typeof useInviteMemberMutation>;
export type InviteMemberMutationResult = Apollo.MutationResult<InviteMemberMutation>;
export type InviteMemberMutationOptions = Apollo.BaseMutationOptions<InviteMemberMutation, InviteMemberMutationVariables>;
export const RemoveLabelDocument = gql`
    mutation RemoveLabel($id: String!) {
  deleteTaskLabel(labelId: $id)
}
    `;
export type RemoveLabelMutationFn = Apollo.MutationFunction<RemoveLabelMutation, RemoveLabelMutationVariables>;

/**
 * __useRemoveLabelMutation__
 *
 * To run a mutation, you first call `useRemoveLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLabelMutation, { data, loading, error }] = useRemoveLabelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveLabelMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLabelMutation, RemoveLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLabelMutation, RemoveLabelMutationVariables>(RemoveLabelDocument, options);
      }
export type RemoveLabelMutationHookResult = ReturnType<typeof useRemoveLabelMutation>;
export type RemoveLabelMutationResult = Apollo.MutationResult<RemoveLabelMutation>;
export type RemoveLabelMutationOptions = Apollo.BaseMutationOptions<RemoveLabelMutation, RemoveLabelMutationVariables>;
export const RemoveProjectCoverDocument = gql`
    mutation RemoveProjectCover {
  removeProjectCover
}
    `;
export type RemoveProjectCoverMutationFn = Apollo.MutationFunction<RemoveProjectCoverMutation, RemoveProjectCoverMutationVariables>;

/**
 * __useRemoveProjectCoverMutation__
 *
 * To run a mutation, you first call `useRemoveProjectCoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectCoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectCoverMutation, { data, loading, error }] = useRemoveProjectCoverMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveProjectCoverMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectCoverMutation, RemoveProjectCoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectCoverMutation, RemoveProjectCoverMutationVariables>(RemoveProjectCoverDocument, options);
      }
export type RemoveProjectCoverMutationHookResult = ReturnType<typeof useRemoveProjectCoverMutation>;
export type RemoveProjectCoverMutationResult = Apollo.MutationResult<RemoveProjectCoverMutation>;
export type RemoveProjectCoverMutationOptions = Apollo.BaseMutationOptions<RemoveProjectCoverMutation, RemoveProjectCoverMutationVariables>;
export const RemoveProjectMemberDocument = gql`
    mutation RemoveProjectMember($userId: String!) {
  removeProjectMember(userId: $userId)
}
    `;
export type RemoveProjectMemberMutationFn = Apollo.MutationFunction<RemoveProjectMemberMutation, RemoveProjectMemberMutationVariables>;

/**
 * __useRemoveProjectMemberMutation__
 *
 * To run a mutation, you first call `useRemoveProjectMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectMemberMutation, { data, loading, error }] = useRemoveProjectMemberMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveProjectMemberMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectMemberMutation, RemoveProjectMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectMemberMutation, RemoveProjectMemberMutationVariables>(RemoveProjectMemberDocument, options);
      }
export type RemoveProjectMemberMutationHookResult = ReturnType<typeof useRemoveProjectMemberMutation>;
export type RemoveProjectMemberMutationResult = Apollo.MutationResult<RemoveProjectMemberMutation>;
export type RemoveProjectMemberMutationOptions = Apollo.BaseMutationOptions<RemoveProjectMemberMutation, RemoveProjectMemberMutationVariables>;
export const UpgrageProjectPlanDocument = gql`
    mutation UpgrageProjectPlan {
  makePayment {
    url
  }
}
    `;
export type UpgrageProjectPlanMutationFn = Apollo.MutationFunction<UpgrageProjectPlanMutation, UpgrageProjectPlanMutationVariables>;

/**
 * __useUpgrageProjectPlanMutation__
 *
 * To run a mutation, you first call `useUpgrageProjectPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpgrageProjectPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upgrageProjectPlanMutation, { data, loading, error }] = useUpgrageProjectPlanMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpgrageProjectPlanMutation(baseOptions?: Apollo.MutationHookOptions<UpgrageProjectPlanMutation, UpgrageProjectPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpgrageProjectPlanMutation, UpgrageProjectPlanMutationVariables>(UpgrageProjectPlanDocument, options);
      }
export type UpgrageProjectPlanMutationHookResult = ReturnType<typeof useUpgrageProjectPlanMutation>;
export type UpgrageProjectPlanMutationResult = Apollo.MutationResult<UpgrageProjectPlanMutation>;
export type UpgrageProjectPlanMutationOptions = Apollo.BaseMutationOptions<UpgrageProjectPlanMutation, UpgrageProjectPlanMutationVariables>;
export const ChangeTaskStatusDocument = gql`
    mutation ChangeTaskStatus($data: ChangeStatusInput!) {
  changeTaskStatus(input: $data) {
    id
    status
  }
}
    `;
export type ChangeTaskStatusMutationFn = Apollo.MutationFunction<ChangeTaskStatusMutation, ChangeTaskStatusMutationVariables>;

/**
 * __useChangeTaskStatusMutation__
 *
 * To run a mutation, you first call `useChangeTaskStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeTaskStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeTaskStatusMutation, { data, loading, error }] = useChangeTaskStatusMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeTaskStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeTaskStatusMutation, ChangeTaskStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeTaskStatusMutation, ChangeTaskStatusMutationVariables>(ChangeTaskStatusDocument, options);
      }
export type ChangeTaskStatusMutationHookResult = ReturnType<typeof useChangeTaskStatusMutation>;
export type ChangeTaskStatusMutationResult = Apollo.MutationResult<ChangeTaskStatusMutation>;
export type ChangeTaskStatusMutationOptions = Apollo.BaseMutationOptions<ChangeTaskStatusMutation, ChangeTaskStatusMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($data: TaskInput!) {
  createTask(input: $data) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: String!) {
  deleteTask(taskId: $id) {
    id
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: String!, $data: TaskInput!) {
  updateTask(taskId: $id, input: $data) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($data: ChangeEmailInput!) {
  changeEmail(data: $data)
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangeNotificationsSettingsDocument = gql`
    mutation ChangeNotificationsSettings($data: ChangeNotificationSettingsInput!) {
  changeNotificationsSettings(data: $data) {
    notificationSettings {
      siteNotification
      telegramNotification
    }
    telegramAuthToken
  }
}
    `;
export type ChangeNotificationsSettingsMutationFn = Apollo.MutationFunction<ChangeNotificationsSettingsMutation, ChangeNotificationsSettingsMutationVariables>;

/**
 * __useChangeNotificationsSettingsMutation__
 *
 * To run a mutation, you first call `useChangeNotificationsSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeNotificationsSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeNotificationsSettingsMutation, { data, loading, error }] = useChangeNotificationsSettingsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeNotificationsSettingsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeNotificationsSettingsMutation, ChangeNotificationsSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeNotificationsSettingsMutation, ChangeNotificationsSettingsMutationVariables>(ChangeNotificationsSettingsDocument, options);
      }
export type ChangeNotificationsSettingsMutationHookResult = ReturnType<typeof useChangeNotificationsSettingsMutation>;
export type ChangeNotificationsSettingsMutationResult = Apollo.MutationResult<ChangeNotificationsSettingsMutation>;
export type ChangeNotificationsSettingsMutationOptions = Apollo.BaseMutationOptions<ChangeNotificationsSettingsMutation, ChangeNotificationsSettingsMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeProfileAvatarDocument = gql`
    mutation ChangeProfileAvatar($avatar: Upload!) {
  changeProfileAvatar(avatar: $avatar)
}
    `;
export type ChangeProfileAvatarMutationFn = Apollo.MutationFunction<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>;

/**
 * __useChangeProfileAvatarMutation__
 *
 * To run a mutation, you first call `useChangeProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileAvatarMutation, { data, loading, error }] = useChangeProfileAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useChangeProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>(ChangeProfileAvatarDocument, options);
      }
export type ChangeProfileAvatarMutationHookResult = ReturnType<typeof useChangeProfileAvatarMutation>;
export type ChangeProfileAvatarMutationResult = Apollo.MutationResult<ChangeProfileAvatarMutation>;
export type ChangeProfileAvatarMutationOptions = Apollo.BaseMutationOptions<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>;
export const ChangeProfileInfoDocument = gql`
    mutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {
  changeProfileInfo(data: $data)
}
    `;
export type ChangeProfileInfoMutationFn = Apollo.MutationFunction<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;

/**
 * __useChangeProfileInfoMutation__
 *
 * To run a mutation, you first call `useChangeProfileInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileInfoMutation, { data, loading, error }] = useChangeProfileInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeProfileInfoMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>(ChangeProfileInfoDocument, options);
      }
export type ChangeProfileInfoMutationHookResult = ReturnType<typeof useChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationResult = Apollo.MutationResult<ChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationOptions = Apollo.BaseMutationOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;
export const ClearSessionCookieDocument = gql`
    mutation ClearSessionCookie {
  clearSessionCookie
}
    `;
export type ClearSessionCookieMutationFn = Apollo.MutationFunction<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;

/**
 * __useClearSessionCookieMutation__
 *
 * To run a mutation, you first call `useClearSessionCookieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearSessionCookieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearSessionCookieMutation, { data, loading, error }] = useClearSessionCookieMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearSessionCookieMutation(baseOptions?: Apollo.MutationHookOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>(ClearSessionCookieDocument, options);
      }
export type ClearSessionCookieMutationHookResult = ReturnType<typeof useClearSessionCookieMutation>;
export type ClearSessionCookieMutationResult = Apollo.MutationResult<ClearSessionCookieMutation>;
export type ClearSessionCookieMutationOptions = Apollo.BaseMutationOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;
export const CreateSocialLinkDocument = gql`
    mutation CreateSocialLink($data: SocialLinkInput!) {
  createSocialLink(data: $data)
}
    `;
export type CreateSocialLinkMutationFn = Apollo.MutationFunction<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;

/**
 * __useCreateSocialLinkMutation__
 *
 * To run a mutation, you first call `useCreateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSocialLinkMutation, { data, loading, error }] = useCreateSocialLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>(CreateSocialLinkDocument, options);
      }
export type CreateSocialLinkMutationHookResult = ReturnType<typeof useCreateSocialLinkMutation>;
export type CreateSocialLinkMutationResult = Apollo.MutationResult<CreateSocialLinkMutation>;
export type CreateSocialLinkMutationOptions = Apollo.BaseMutationOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;
export const DisableTotpDocument = gql`
    mutation DisableTotp {
  disableTotp
}
    `;
export type DisableTotpMutationFn = Apollo.MutationFunction<DisableTotpMutation, DisableTotpMutationVariables>;

/**
 * __useDisableTotpMutation__
 *
 * To run a mutation, you first call `useDisableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableTotpMutation, { data, loading, error }] = useDisableTotpMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisableTotpMutation(baseOptions?: Apollo.MutationHookOptions<DisableTotpMutation, DisableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableTotpMutation, DisableTotpMutationVariables>(DisableTotpDocument, options);
      }
export type DisableTotpMutationHookResult = ReturnType<typeof useDisableTotpMutation>;
export type DisableTotpMutationResult = Apollo.MutationResult<DisableTotpMutation>;
export type DisableTotpMutationOptions = Apollo.BaseMutationOptions<DisableTotpMutation, DisableTotpMutationVariables>;
export const EnableTotpDocument = gql`
    mutation EnableTotp($data: EnableTotpInput!) {
  enableTotp(data: $data)
}
    `;
export type EnableTotpMutationFn = Apollo.MutationFunction<EnableTotpMutation, EnableTotpMutationVariables>;

/**
 * __useEnableTotpMutation__
 *
 * To run a mutation, you first call `useEnableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTotpMutation, { data, loading, error }] = useEnableTotpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEnableTotpMutation(baseOptions?: Apollo.MutationHookOptions<EnableTotpMutation, EnableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableTotpMutation, EnableTotpMutationVariables>(EnableTotpDocument, options);
      }
export type EnableTotpMutationHookResult = ReturnType<typeof useEnableTotpMutation>;
export type EnableTotpMutationResult = Apollo.MutationResult<EnableTotpMutation>;
export type EnableTotpMutationOptions = Apollo.BaseMutationOptions<EnableTotpMutation, EnableTotpMutationVariables>;
export const RemoveProfileAvatarDocument = gql`
    mutation RemoveProfileAvatar {
  removeProfileAvatar
}
    `;
export type RemoveProfileAvatarMutationFn = Apollo.MutationFunction<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>;

/**
 * __useRemoveProfileAvatarMutation__
 *
 * To run a mutation, you first call `useRemoveProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProfileAvatarMutation, { data, loading, error }] = useRemoveProfileAvatarMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>(RemoveProfileAvatarDocument, options);
      }
export type RemoveProfileAvatarMutationHookResult = ReturnType<typeof useRemoveProfileAvatarMutation>;
export type RemoveProfileAvatarMutationResult = Apollo.MutationResult<RemoveProfileAvatarMutation>;
export type RemoveProfileAvatarMutationOptions = Apollo.BaseMutationOptions<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>;
export const RemoveSessionDocument = gql`
    mutation RemoveSession($id: String!) {
  removeSession(id: $id)
}
    `;
export type RemoveSessionMutationFn = Apollo.MutationFunction<RemoveSessionMutation, RemoveSessionMutationVariables>;

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSessionMutation, RemoveSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSessionMutation, RemoveSessionMutationVariables>(RemoveSessionDocument, options);
      }
export type RemoveSessionMutationHookResult = ReturnType<typeof useRemoveSessionMutation>;
export type RemoveSessionMutationResult = Apollo.MutationResult<RemoveSessionMutation>;
export type RemoveSessionMutationOptions = Apollo.BaseMutationOptions<RemoveSessionMutation, RemoveSessionMutationVariables>;
export const RemoveSocialLinkDocument = gql`
    mutation RemoveSocialLink($id: String!) {
  removeSocialLink(id: $id)
}
    `;
export type RemoveSocialLinkMutationFn = Apollo.MutationFunction<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;

/**
 * __useRemoveSocialLinkMutation__
 *
 * To run a mutation, you first call `useRemoveSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSocialLinkMutation, { data, loading, error }] = useRemoveSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>(RemoveSocialLinkDocument, options);
      }
export type RemoveSocialLinkMutationHookResult = ReturnType<typeof useRemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationResult = Apollo.MutationResult<RemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationOptions = Apollo.BaseMutationOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;
export const ReorderSocialLinksDocument = gql`
    mutation ReorderSocialLinks($list: [SocialLinkOrderInput!]!) {
  reorderSocialLink(list: $list)
}
    `;
export type ReorderSocialLinksMutationFn = Apollo.MutationFunction<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;

/**
 * __useReorderSocialLinksMutation__
 *
 * To run a mutation, you first call `useReorderSocialLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderSocialLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderSocialLinksMutation, { data, loading, error }] = useReorderSocialLinksMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useReorderSocialLinksMutation(baseOptions?: Apollo.MutationHookOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>(ReorderSocialLinksDocument, options);
      }
export type ReorderSocialLinksMutationHookResult = ReturnType<typeof useReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationResult = Apollo.MutationResult<ReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationOptions = Apollo.BaseMutationOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;
export const UpdateSocialLinkDocument = gql`
    mutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {
  updateSocialLink(id: $id, data: $data)
}
    `;
export type UpdateSocialLinkMutationFn = Apollo.MutationFunction<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;

/**
 * __useUpdateSocialLinkMutation__
 *
 * To run a mutation, you first call `useUpdateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialLinkMutation, { data, loading, error }] = useUpdateSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>(UpdateSocialLinkDocument, options);
      }
export type UpdateSocialLinkMutationHookResult = ReturnType<typeof useUpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationResult = Apollo.MutationResult<UpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationOptions = Apollo.BaseMutationOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;
export const FindProjectByIdDocument = gql`
    query FindProjectById {
  findProjectById {
    id
    name
    icon
    description
    cover
    plan
    members {
      id
      userId
      projectId
      user {
        username
        displayName
        avatar
        email
      }
      role
      createdAt
    }
    labels {
      id
      name
      color
    }
  }
}
    `;

/**
 * __useFindProjectByIdQuery__
 *
 * To run a query within a React component, call `useFindProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectByIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindProjectByIdQuery(baseOptions?: Apollo.QueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
      }
export function useFindProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
        }
export function useFindProjectByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
        }
export type FindProjectByIdQueryHookResult = ReturnType<typeof useFindProjectByIdQuery>;
export type FindProjectByIdLazyQueryHookResult = ReturnType<typeof useFindProjectByIdLazyQuery>;
export type FindProjectByIdSuspenseQueryHookResult = ReturnType<typeof useFindProjectByIdSuspenseQuery>;
export type FindProjectByIdQueryResult = Apollo.QueryResult<FindProjectByIdQuery, FindProjectByIdQueryVariables>;
export const FindUserProjectsDocument = gql`
    query FindUserProjects {
  getAllUserProjects {
    id
    name
    icon
  }
}
    `;

/**
 * __useFindUserProjectsQuery__
 *
 * To run a query within a React component, call `useFindUserProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindUserProjectsQuery(baseOptions?: Apollo.QueryHookOptions<FindUserProjectsQuery, FindUserProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserProjectsQuery, FindUserProjectsQueryVariables>(FindUserProjectsDocument, options);
      }
export function useFindUserProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserProjectsQuery, FindUserProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserProjectsQuery, FindUserProjectsQueryVariables>(FindUserProjectsDocument, options);
        }
export function useFindUserProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUserProjectsQuery, FindUserProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserProjectsQuery, FindUserProjectsQueryVariables>(FindUserProjectsDocument, options);
        }
export type FindUserProjectsQueryHookResult = ReturnType<typeof useFindUserProjectsQuery>;
export type FindUserProjectsLazyQueryHookResult = ReturnType<typeof useFindUserProjectsLazyQuery>;
export type FindUserProjectsSuspenseQueryHookResult = ReturnType<typeof useFindUserProjectsSuspenseQuery>;
export type FindUserProjectsQueryResult = Apollo.QueryResult<FindUserProjectsQuery, FindUserProjectsQueryVariables>;
export const FindUserProjectsListDocument = gql`
    query FindUserProjectsList {
  getAllUserProjects {
    id
    name
    icon
    description
    cover
    members {
      user {
        id
        username
        displayName
        avatar
      }
      role
    }
  }
}
    `;

/**
 * __useFindUserProjectsListQuery__
 *
 * To run a query within a React component, call `useFindUserProjectsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserProjectsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserProjectsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindUserProjectsListQuery(baseOptions?: Apollo.QueryHookOptions<FindUserProjectsListQuery, FindUserProjectsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserProjectsListQuery, FindUserProjectsListQueryVariables>(FindUserProjectsListDocument, options);
      }
export function useFindUserProjectsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserProjectsListQuery, FindUserProjectsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserProjectsListQuery, FindUserProjectsListQueryVariables>(FindUserProjectsListDocument, options);
        }
export function useFindUserProjectsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUserProjectsListQuery, FindUserProjectsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserProjectsListQuery, FindUserProjectsListQueryVariables>(FindUserProjectsListDocument, options);
        }
export type FindUserProjectsListQueryHookResult = ReturnType<typeof useFindUserProjectsListQuery>;
export type FindUserProjectsListLazyQueryHookResult = ReturnType<typeof useFindUserProjectsListLazyQuery>;
export type FindUserProjectsListSuspenseQueryHookResult = ReturnType<typeof useFindUserProjectsListSuspenseQuery>;
export type FindUserProjectsListQueryResult = Apollo.QueryResult<FindUserProjectsListQuery, FindUserProjectsListQueryVariables>;
export const FindAllTasksDocument = gql`
    query FindAllTasks {
  findAllTasks {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useFindAllTasksQuery__
 *
 * To run a query within a React component, call `useFindAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllTasksQuery(baseOptions?: Apollo.QueryHookOptions<FindAllTasksQuery, FindAllTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllTasksQuery, FindAllTasksQueryVariables>(FindAllTasksDocument, options);
      }
export function useFindAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllTasksQuery, FindAllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllTasksQuery, FindAllTasksQueryVariables>(FindAllTasksDocument, options);
        }
export function useFindAllTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllTasksQuery, FindAllTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllTasksQuery, FindAllTasksQueryVariables>(FindAllTasksDocument, options);
        }
export type FindAllTasksQueryHookResult = ReturnType<typeof useFindAllTasksQuery>;
export type FindAllTasksLazyQueryHookResult = ReturnType<typeof useFindAllTasksLazyQuery>;
export type FindAllTasksSuspenseQueryHookResult = ReturnType<typeof useFindAllTasksSuspenseQuery>;
export type FindAllTasksQueryResult = Apollo.QueryResult<FindAllTasksQuery, FindAllTasksQueryVariables>;
export const FindCurrentSessionDocument = gql`
    query FindCurrentSession {
  findCurrentSession {
    id
    metadata {
      location {
        country
        city
        latitude
        longitude
      }
      device {
        browser
        os
      }
      ip
    }
    createdAt
  }
}
    `;

/**
 * __useFindCurrentSessionQuery__
 *
 * To run a query within a React component, call `useFindCurrentSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCurrentSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCurrentSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindCurrentSessionQuery(baseOptions?: Apollo.QueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
      }
export function useFindCurrentSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export function useFindCurrentSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export type FindCurrentSessionQueryHookResult = ReturnType<typeof useFindCurrentSessionQuery>;
export type FindCurrentSessionLazyQueryHookResult = ReturnType<typeof useFindCurrentSessionLazyQuery>;
export type FindCurrentSessionSuspenseQueryHookResult = ReturnType<typeof useFindCurrentSessionSuspenseQuery>;
export type FindCurrentSessionQueryResult = Apollo.QueryResult<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>;
export const FindProfileDocument = gql`
    query FindProfile {
  findProfile {
    id
    username
    email
    displayName
    avatar
    bio
    isTotpEnabled
    notificationSettings {
      siteNotification
      telegramNotification
    }
  }
}
    `;

/**
 * __useFindProfileQuery__
 *
 * To run a query within a React component, call `useFindProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindProfileQuery(baseOptions?: Apollo.QueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
      }
export function useFindProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export function useFindProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export type FindProfileQueryHookResult = ReturnType<typeof useFindProfileQuery>;
export type FindProfileLazyQueryHookResult = ReturnType<typeof useFindProfileLazyQuery>;
export type FindProfileSuspenseQueryHookResult = ReturnType<typeof useFindProfileSuspenseQuery>;
export type FindProfileQueryResult = Apollo.QueryResult<FindProfileQuery, FindProfileQueryVariables>;
export const FindSessionsByUserDocument = gql`
    query findSessionsByUser {
  findSessionsByUser {
    id
    metadata {
      location {
        country
        city
        latitude
        longitude
      }
      device {
        browser
        os
      }
      ip
    }
    createdAt
  }
}
    `;

/**
 * __useFindSessionsByUserQuery__
 *
 * To run a query within a React component, call `useFindSessionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSessionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSessionsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSessionsByUserQuery(baseOptions?: Apollo.QueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
      }
export function useFindSessionsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export function useFindSessionsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export type FindSessionsByUserQueryHookResult = ReturnType<typeof useFindSessionsByUserQuery>;
export type FindSessionsByUserLazyQueryHookResult = ReturnType<typeof useFindSessionsByUserLazyQuery>;
export type FindSessionsByUserSuspenseQueryHookResult = ReturnType<typeof useFindSessionsByUserSuspenseQuery>;
export type FindSessionsByUserQueryResult = Apollo.QueryResult<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>;
export const FindSocialLinksDocument = gql`
    query FindSocialLinks {
  findSocialLinks {
    id
    title
    url
    position
  }
}
    `;

/**
 * __useFindSocialLinksQuery__
 *
 * To run a query within a React component, call `useFindSocialLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSocialLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSocialLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSocialLinksQuery(baseOptions?: Apollo.QueryHookOptions<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSocialLinksQuery, FindSocialLinksQueryVariables>(FindSocialLinksDocument, options);
      }
export function useFindSocialLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSocialLinksQuery, FindSocialLinksQueryVariables>(FindSocialLinksDocument, options);
        }
export function useFindSocialLinksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSocialLinksQuery, FindSocialLinksQueryVariables>(FindSocialLinksDocument, options);
        }
export type FindSocialLinksQueryHookResult = ReturnType<typeof useFindSocialLinksQuery>;
export type FindSocialLinksLazyQueryHookResult = ReturnType<typeof useFindSocialLinksLazyQuery>;
export type FindSocialLinksSuspenseQueryHookResult = ReturnType<typeof useFindSocialLinksSuspenseQuery>;
export type FindSocialLinksQueryResult = Apollo.QueryResult<FindSocialLinksQuery, FindSocialLinksQueryVariables>;
export const GenerateTotpSecretDocument = gql`
    query GenerateTotpSecret {
  generateTotpSecret {
    secret
    qrCodeUrl
  }
}
    `;

/**
 * __useGenerateTotpSecretQuery__
 *
 * To run a query within a React component, call `useGenerateTotpSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateTotpSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateTotpSecretQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTotpSecretQuery(baseOptions?: Apollo.QueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
      }
export function useGenerateTotpSecretLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export type GenerateTotpSecretQueryHookResult = ReturnType<typeof useGenerateTotpSecretQuery>;
export type GenerateTotpSecretLazyQueryHookResult = ReturnType<typeof useGenerateTotpSecretLazyQuery>;
export type GenerateTotpSecretSuspenseQueryHookResult = ReturnType<typeof useGenerateTotpSecretSuspenseQuery>;
export type GenerateTotpSecretQueryResult = Apollo.QueryResult<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>;
export const TaskAddedDocument = gql`
    subscription TaskAdded($projectId: String!) {
  taskAdded(projectId: $projectId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTaskAddedSubscription__
 *
 * To run a query within a React component, call `useTaskAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskAddedSubscription({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useTaskAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<TaskAddedSubscription, TaskAddedSubscriptionVariables> & ({ variables: TaskAddedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TaskAddedSubscription, TaskAddedSubscriptionVariables>(TaskAddedDocument, options);
      }
export type TaskAddedSubscriptionHookResult = ReturnType<typeof useTaskAddedSubscription>;
export type TaskAddedSubscriptionResult = Apollo.SubscriptionResult<TaskAddedSubscription>;
export const TaskChangedDocument = gql`
    subscription TaskChanged($projectId: String!) {
  taskChanged(projectId: $projectId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTaskChangedSubscription__
 *
 * To run a query within a React component, call `useTaskChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskChangedSubscription({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useTaskChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<TaskChangedSubscription, TaskChangedSubscriptionVariables> & ({ variables: TaskChangedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TaskChangedSubscription, TaskChangedSubscriptionVariables>(TaskChangedDocument, options);
      }
export type TaskChangedSubscriptionHookResult = ReturnType<typeof useTaskChangedSubscription>;
export type TaskChangedSubscriptionResult = Apollo.SubscriptionResult<TaskChangedSubscription>;
export const TaskDeletedDocument = gql`
    subscription TaskDeleted($projectId: String!) {
  taskDeleted(projectId: $projectId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTaskDeletedSubscription__
 *
 * To run a query within a React component, call `useTaskDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskDeletedSubscription({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useTaskDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<TaskDeletedSubscription, TaskDeletedSubscriptionVariables> & ({ variables: TaskDeletedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TaskDeletedSubscription, TaskDeletedSubscriptionVariables>(TaskDeletedDocument, options);
      }
export type TaskDeletedSubscriptionHookResult = ReturnType<typeof useTaskDeletedSubscription>;
export type TaskDeletedSubscriptionResult = Apollo.SubscriptionResult<TaskDeletedSubscription>;