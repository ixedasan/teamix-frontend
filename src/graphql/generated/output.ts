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
  position?: InputMaybe<Scalars['Float']['input']>;
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

export type CommentSubscriptionPayload = {
  __typename?: 'CommentSubscriptionPayload';
  comment?: Maybe<CommentModel>;
  mutation: MutationType;
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
  addLabelToTask: TaskModel;
  assignTask: TaskModel;
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
  createTaskLabel: TaskLabelModel;
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
  removeLabelFromTask: TaskModel;
  removeProfileAvatar: Scalars['Boolean']['output'];
  removeProjectCover: Scalars['Boolean']['output'];
  removeProjectMember: Scalars['Boolean']['output'];
  removeSession: Scalars['Boolean']['output'];
  removeSocialLink: Scalars['Boolean']['output'];
  reorderSocialLink: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  sendComment: CommentModel;
  setCurrentProject: Scalars['Boolean']['output'];
  unassignTask: TaskModel;
  updateComment: CommentModel;
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
  data: ChangeDocumentInput;
  documentId: Scalars['String']['input'];
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
  data: TaskLinkInput;
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
  data: SendCommentInput;
};


export type MutationSetCurrentProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationUnassignTaskArgs = {
  taskId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  data: UpdateCommentInput;
};


export type MutationUpdateSocialLinkArgs = {
  data: SocialLinkInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
  taskId: Scalars['String']['input'];
};


export type MutationUpdateTaskLinkArgs = {
  data: TaskLinkInput;
  linkId: Scalars['String']['input'];
};


export type MutationUploadTaskAttachmentArgs = {
  file: Scalars['Upload']['input'];
  taskId: Scalars['String']['input'];
};


export type MutationVerifyAccauntArgs = {
  data: VerificationInput;
};

export enum MutationType {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED'
}

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
  findDocumentById: DocumentModel;
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


export type QueryFindDocumentByIdArgs = {
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
  commentChanged: CommentSubscriptionPayload;
  documentChanged: DocumentModel;
  taskAdded: TaskModel;
  taskChanged: TaskModel;
  taskDeleted: TaskModel;
};


export type SubscriptionCommentChangedArgs = {
  taskId: Scalars['String']['input'];
};


export type SubscriptionDocumentChangedArgs = {
  documentId: Scalars['String']['input'];
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
  position?: InputMaybe<Scalars['Float']['input']>;
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
  attachments: Array<AttachmentModel>;
  comments: Array<CommentModel>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: UserModel;
  createdById: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  labels: Array<TaskLabelModel>;
  links: Array<TaskLinkModel>;
  position: Scalars['Float']['output'];
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

export type UpdateCommentInput = {
  commentId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};

export type UpdateTaskInput = {
  assigneeId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  labelsIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  position?: InputMaybe<Scalars['Float']['input']>;
  priority?: InputMaybe<Priority>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type CommentFragment = { __typename?: 'CommentModel', id: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } };

export type DocumentFragment = { __typename?: 'DocumentModel', id: string, title: string, content: any, projectId: string, createdAt: any, updatedAt: any };

export type TaskFragment = { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> };

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

export type ChangeDocumentMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: ChangeDocumentInput;
}>;


export type ChangeDocumentMutation = { __typename?: 'Mutation', changeDocument: { __typename?: 'DocumentModel', id: string, title: string, content: any, projectId: string, createdAt: any, updatedAt: any } };

export type CreateDocumentMutationVariables = Exact<{
  data: CreateDocumentInput;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument: boolean };

export type DeleteDocumentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument: boolean };

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


export type CreateLabelMutation = { __typename?: 'Mutation', createTaskLabel: { __typename?: 'TaskLabelModel', id: string } };

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

export type AddLabelToTaskMutationVariables = Exact<{
  taskId: Scalars['String']['input'];
  labelId: Scalars['String']['input'];
}>;


export type AddLabelToTaskMutation = { __typename?: 'Mutation', addLabelToTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type AssingTaskMutationVariables = Exact<{
  taskId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type AssingTaskMutation = { __typename?: 'Mutation', assignTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type ChangeTaskStatusMutationVariables = Exact<{
  data: ChangeStatusInput;
}>;


export type ChangeTaskStatusMutation = { __typename?: 'Mutation', changeTaskStatus: { __typename?: 'TaskModel', id: string, status: TaskStatus, position: number } };

export type CreateTaskMutationVariables = Exact<{
  data: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type CreateTaskLinkMutationVariables = Exact<{
  taskId: Scalars['String']['input'];
  data: TaskLinkInput;
}>;


export type CreateTaskLinkMutation = { __typename?: 'Mutation', createTaskLink: boolean };

export type CreateTaskMutationMutationVariables = Exact<{
  data: TaskInput;
}>;


export type CreateTaskMutationMutation = { __typename?: 'Mutation', createTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'TaskModel', id: string } };

export type DeleteTaskAttachmentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskAttachmentMutation = { __typename?: 'Mutation', deleteTaskAttachment: boolean };

export type DeleteTaskLinkMutationVariables = Exact<{
  linkId: Scalars['String']['input'];
}>;


export type DeleteTaskLinkMutation = { __typename?: 'Mutation', deleteTaskLink: boolean };

export type GenerateAttachmentDownloadUrlMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GenerateAttachmentDownloadUrlMutation = { __typename?: 'Mutation', generateAttachmentDownloadUrl: string };

export type RemoveLabelFromTaskMutationVariables = Exact<{
  taskId: Scalars['String']['input'];
  labelId: Scalars['String']['input'];
}>;


export type RemoveLabelFromTaskMutation = { __typename?: 'Mutation', removeLabelFromTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type SendCommentMutationVariables = Exact<{
  data: SendCommentInput;
}>;


export type SendCommentMutation = { __typename?: 'Mutation', sendComment: { __typename?: 'CommentModel', id: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type UnassignTaskMutationVariables = Exact<{
  taskId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type UnassignTaskMutation = { __typename?: 'Mutation', unassignTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type UpdateCommentMutationVariables = Exact<{
  data: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'CommentModel', id: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type UpdateTaskLinkMutationVariables = Exact<{
  linkId: Scalars['String']['input'];
  data: TaskLinkInput;
}>;


export type UpdateTaskLinkMutation = { __typename?: 'Mutation', updateTaskLink: boolean };

export type UploadTaskAttachmentMutationVariables = Exact<{
  taskId: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
}>;


export type UploadTaskAttachmentMutation = { __typename?: 'Mutation', uploadTaskAttachment: boolean };

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

export type FindDocumentByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindDocumentByIdQuery = { __typename?: 'Query', findDocumentById: { __typename?: 'DocumentModel', id: string, title: string, content: any, projectId: string, createdAt: any, updatedAt: any } };

export type FindDocumentsByProjectQueryVariables = Exact<{ [key: string]: never; }>;


export type FindDocumentsByProjectQuery = { __typename?: 'Query', findDocumentsByProject: Array<{ __typename?: 'DocumentModel', id: string, title: string, projectId: string, createdAt: any, updatedAt: any }> };

export type FindProjectByIdQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProjectByIdQuery = { __typename?: 'Query', findProjectById: { __typename?: 'ProjectModel', id: string, name: string, icon?: string | null, description?: string | null, cover?: string | null, plan: ProjectPlan, members: Array<{ __typename?: 'MemberModel', id: string, userId: string, projectId: string, role: Role, createdAt: any, user: { __typename?: 'UserModel', username: string, displayName: string, avatar?: string | null, email: string } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type FindUserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserProjectsQuery = { __typename?: 'Query', getAllUserProjects: Array<{ __typename?: 'ProjectModel', id: string, name: string, icon?: string | null }> };

export type FindUserProjectsListQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserProjectsListQuery = { __typename?: 'Query', getAllUserProjects: Array<{ __typename?: 'ProjectModel', id: string, name: string, icon?: string | null, description?: string | null, cover?: string | null, members: Array<{ __typename?: 'MemberModel', role: Role, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }> }> };

export type FindAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllTasksQuery = { __typename?: 'Query', findAllTasks: Array<{ __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> }> };

export type FindCommentsByTaskQueryVariables = Exact<{
  taskId: Scalars['String']['input'];
}>;


export type FindCommentsByTaskQuery = { __typename?: 'Query', findCommentsByTask: Array<{ __typename?: 'CommentModel', id: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }> };

export type FindTaskAttachmentsQueryVariables = Exact<{
  taskId: Scalars['String']['input'];
}>;


export type FindTaskAttachmentsQuery = { __typename?: 'Query', findTaskAttachments: Array<{ __typename?: 'AttachmentModel', id: string, filename: string, filepath: string, mimeType: string, size: number, createdAt: any }> };

export type FindTaskByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindTaskByIdQuery = { __typename?: 'Query', findTask: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, createdAt: any, updatedAt: any, createdBy: { __typename?: 'UserModel', avatar?: string | null, displayName: string }, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type FindTaskLinksQueryVariables = Exact<{
  taskId: Scalars['String']['input'];
}>;


export type FindTaskLinksQuery = { __typename?: 'Query', findTaskLinks: Array<{ __typename?: 'TaskLinkModel', id: string, title?: string | null, url: string, createdAt: any, updatedAt: any }> };

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

export type DocumentChangedSubscriptionVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DocumentChangedSubscription = { __typename?: 'Subscription', documentChanged: { __typename?: 'DocumentModel', id: string, title: string, content: any, projectId: string, createdAt: any, updatedAt: any } };

export type CommentChangedSubscriptionVariables = Exact<{
  taskId: Scalars['String']['input'];
}>;


export type CommentChangedSubscription = { __typename?: 'Subscription', commentChanged: { __typename?: 'CommentSubscriptionPayload', mutation: MutationType, comment?: { __typename?: 'CommentModel', id: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } | null } };

export type TaskAddedSubscriptionVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type TaskAddedSubscription = { __typename?: 'Subscription', taskAdded: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type TaskChangedSubscriptionVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type TaskChangedSubscription = { __typename?: 'Subscription', taskChanged: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export type TaskDeletedSubscriptionVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type TaskDeletedSubscription = { __typename?: 'Subscription', taskDeleted: { __typename?: 'TaskModel', id: string, title: string, description?: string | null, status: TaskStatus, priority: Priority, position: number, startDate?: any | null, dueDate?: any | null, assignees: Array<{ __typename?: 'TaskAssigneeModel', id: string, userId: string, user: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }>, labels: Array<{ __typename?: 'TaskLabelModel', id: string, name: string, color: string }> } };

export const CommentFragmentDoc = gql`
    fragment Comment on CommentModel {
  id
  content
  createdAt
  updatedAt
  author {
    id
    username
    displayName
    avatar
  }
}
    `;
export const DocumentFragmentDoc = gql`
    fragment Document on DocumentModel {
  id
  title
  content
  projectId
  createdAt
  updatedAt
}
    `;
export const TaskFragmentDoc = gql`
    fragment Task on TaskModel {
  id
  title
  description
  status
  priority
  position
  startDate
  dueDate
  assignees {
    id
    userId
    user {
      id
      username
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
export const ChangeDocumentDocument = gql`
    mutation ChangeDocument($id: String!, $data: ChangeDocumentInput!) {
  changeDocument(documentId: $id, data: $data) {
    ...Document
  }
}
    ${DocumentFragmentDoc}`;
export type ChangeDocumentMutationFn = Apollo.MutationFunction<ChangeDocumentMutation, ChangeDocumentMutationVariables>;

/**
 * __useChangeDocumentMutation__
 *
 * To run a mutation, you first call `useChangeDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeDocumentMutation, { data, loading, error }] = useChangeDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeDocumentMutation(baseOptions?: Apollo.MutationHookOptions<ChangeDocumentMutation, ChangeDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeDocumentMutation, ChangeDocumentMutationVariables>(ChangeDocumentDocument, options);
      }
export type ChangeDocumentMutationHookResult = ReturnType<typeof useChangeDocumentMutation>;
export type ChangeDocumentMutationResult = Apollo.MutationResult<ChangeDocumentMutation>;
export type ChangeDocumentMutationOptions = Apollo.BaseMutationOptions<ChangeDocumentMutation, ChangeDocumentMutationVariables>;
export const CreateDocumentDocument = gql`
    mutation CreateDocument($data: CreateDocumentInput!) {
  createDocument(data: $data)
}
    `;
export type CreateDocumentMutationFn = Apollo.MutationFunction<CreateDocumentMutation, CreateDocumentMutationVariables>;

/**
 * __useCreateDocumentMutation__
 *
 * To run a mutation, you first call `useCreateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentMutation, { data, loading, error }] = useCreateDocumentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDocumentMutation(baseOptions?: Apollo.MutationHookOptions<CreateDocumentMutation, CreateDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(CreateDocumentDocument, options);
      }
export type CreateDocumentMutationHookResult = ReturnType<typeof useCreateDocumentMutation>;
export type CreateDocumentMutationResult = Apollo.MutationResult<CreateDocumentMutation>;
export type CreateDocumentMutationOptions = Apollo.BaseMutationOptions<CreateDocumentMutation, CreateDocumentMutationVariables>;
export const DeleteDocumentDocument = gql`
    mutation DeleteDocument($id: String!) {
  deleteDocument(documentId: $id)
}
    `;
export type DeleteDocumentMutationFn = Apollo.MutationFunction<DeleteDocumentMutation, DeleteDocumentMutationVariables>;

/**
 * __useDeleteDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDocumentMutation, { data, loading, error }] = useDeleteDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDocumentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDocumentMutation, DeleteDocumentMutationVariables>(DeleteDocumentDocument, options);
      }
export type DeleteDocumentMutationHookResult = ReturnType<typeof useDeleteDocumentMutation>;
export type DeleteDocumentMutationResult = Apollo.MutationResult<DeleteDocumentMutation>;
export type DeleteDocumentMutationOptions = Apollo.BaseMutationOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
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
  createTaskLabel(input: $data) {
    id
  }
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
export const AddLabelToTaskDocument = gql`
    mutation AddLabelToTask($taskId: String!, $labelId: String!) {
  addLabelToTask(taskId: $taskId, labelId: $labelId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type AddLabelToTaskMutationFn = Apollo.MutationFunction<AddLabelToTaskMutation, AddLabelToTaskMutationVariables>;

/**
 * __useAddLabelToTaskMutation__
 *
 * To run a mutation, you first call `useAddLabelToTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLabelToTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLabelToTaskMutation, { data, loading, error }] = useAddLabelToTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      labelId: // value for 'labelId'
 *   },
 * });
 */
export function useAddLabelToTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddLabelToTaskMutation, AddLabelToTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLabelToTaskMutation, AddLabelToTaskMutationVariables>(AddLabelToTaskDocument, options);
      }
export type AddLabelToTaskMutationHookResult = ReturnType<typeof useAddLabelToTaskMutation>;
export type AddLabelToTaskMutationResult = Apollo.MutationResult<AddLabelToTaskMutation>;
export type AddLabelToTaskMutationOptions = Apollo.BaseMutationOptions<AddLabelToTaskMutation, AddLabelToTaskMutationVariables>;
export const AssingTaskDocument = gql`
    mutation AssingTask($taskId: String!, $userId: String!) {
  assignTask(taskId: $taskId, userId: $userId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type AssingTaskMutationFn = Apollo.MutationFunction<AssingTaskMutation, AssingTaskMutationVariables>;

/**
 * __useAssingTaskMutation__
 *
 * To run a mutation, you first call `useAssingTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssingTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assingTaskMutation, { data, loading, error }] = useAssingTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAssingTaskMutation(baseOptions?: Apollo.MutationHookOptions<AssingTaskMutation, AssingTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssingTaskMutation, AssingTaskMutationVariables>(AssingTaskDocument, options);
      }
export type AssingTaskMutationHookResult = ReturnType<typeof useAssingTaskMutation>;
export type AssingTaskMutationResult = Apollo.MutationResult<AssingTaskMutation>;
export type AssingTaskMutationOptions = Apollo.BaseMutationOptions<AssingTaskMutation, AssingTaskMutationVariables>;
export const ChangeTaskStatusDocument = gql`
    mutation ChangeTaskStatus($data: ChangeStatusInput!) {
  changeTaskStatus(input: $data) {
    id
    status
    position
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
export const CreateTaskLinkDocument = gql`
    mutation CreateTaskLink($taskId: String!, $data: TaskLinkInput!) {
  createTaskLink(taskId: $taskId, data: $data)
}
    `;
export type CreateTaskLinkMutationFn = Apollo.MutationFunction<CreateTaskLinkMutation, CreateTaskLinkMutationVariables>;

/**
 * __useCreateTaskLinkMutation__
 *
 * To run a mutation, you first call `useCreateTaskLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskLinkMutation, { data, loading, error }] = useCreateTaskLinkMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskLinkMutation, CreateTaskLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskLinkMutation, CreateTaskLinkMutationVariables>(CreateTaskLinkDocument, options);
      }
export type CreateTaskLinkMutationHookResult = ReturnType<typeof useCreateTaskLinkMutation>;
export type CreateTaskLinkMutationResult = Apollo.MutationResult<CreateTaskLinkMutation>;
export type CreateTaskLinkMutationOptions = Apollo.BaseMutationOptions<CreateTaskLinkMutation, CreateTaskLinkMutationVariables>;
export const CreateTaskMutationDocument = gql`
    mutation CreateTaskMutation($data: TaskInput!) {
  createTask(input: $data) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type CreateTaskMutationMutationFn = Apollo.MutationFunction<CreateTaskMutationMutation, CreateTaskMutationMutationVariables>;

/**
 * __useCreateTaskMutationMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutationMutation, { data, loading, error }] = useCreateTaskMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutationMutation, CreateTaskMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutationMutation, CreateTaskMutationMutationVariables>(CreateTaskMutationDocument, options);
      }
export type CreateTaskMutationMutationHookResult = ReturnType<typeof useCreateTaskMutationMutation>;
export type CreateTaskMutationMutationResult = Apollo.MutationResult<CreateTaskMutationMutation>;
export type CreateTaskMutationMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutationMutation, CreateTaskMutationMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: String!) {
  deleteComment(commentId: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
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
export const DeleteTaskAttachmentDocument = gql`
    mutation DeleteTaskAttachment($id: String!) {
  deleteTaskAttachment(id: $id)
}
    `;
export type DeleteTaskAttachmentMutationFn = Apollo.MutationFunction<DeleteTaskAttachmentMutation, DeleteTaskAttachmentMutationVariables>;

/**
 * __useDeleteTaskAttachmentMutation__
 *
 * To run a mutation, you first call `useDeleteTaskAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskAttachmentMutation, { data, loading, error }] = useDeleteTaskAttachmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskAttachmentMutation, DeleteTaskAttachmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskAttachmentMutation, DeleteTaskAttachmentMutationVariables>(DeleteTaskAttachmentDocument, options);
      }
export type DeleteTaskAttachmentMutationHookResult = ReturnType<typeof useDeleteTaskAttachmentMutation>;
export type DeleteTaskAttachmentMutationResult = Apollo.MutationResult<DeleteTaskAttachmentMutation>;
export type DeleteTaskAttachmentMutationOptions = Apollo.BaseMutationOptions<DeleteTaskAttachmentMutation, DeleteTaskAttachmentMutationVariables>;
export const DeleteTaskLinkDocument = gql`
    mutation DeleteTaskLink($linkId: String!) {
  deleteTaskLink(linkId: $linkId)
}
    `;
export type DeleteTaskLinkMutationFn = Apollo.MutationFunction<DeleteTaskLinkMutation, DeleteTaskLinkMutationVariables>;

/**
 * __useDeleteTaskLinkMutation__
 *
 * To run a mutation, you first call `useDeleteTaskLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskLinkMutation, { data, loading, error }] = useDeleteTaskLinkMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useDeleteTaskLinkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskLinkMutation, DeleteTaskLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskLinkMutation, DeleteTaskLinkMutationVariables>(DeleteTaskLinkDocument, options);
      }
export type DeleteTaskLinkMutationHookResult = ReturnType<typeof useDeleteTaskLinkMutation>;
export type DeleteTaskLinkMutationResult = Apollo.MutationResult<DeleteTaskLinkMutation>;
export type DeleteTaskLinkMutationOptions = Apollo.BaseMutationOptions<DeleteTaskLinkMutation, DeleteTaskLinkMutationVariables>;
export const GenerateAttachmentDownloadUrlDocument = gql`
    mutation GenerateAttachmentDownloadUrl($id: String!) {
  generateAttachmentDownloadUrl(id: $id)
}
    `;
export type GenerateAttachmentDownloadUrlMutationFn = Apollo.MutationFunction<GenerateAttachmentDownloadUrlMutation, GenerateAttachmentDownloadUrlMutationVariables>;

/**
 * __useGenerateAttachmentDownloadUrlMutation__
 *
 * To run a mutation, you first call `useGenerateAttachmentDownloadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAttachmentDownloadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAttachmentDownloadUrlMutation, { data, loading, error }] = useGenerateAttachmentDownloadUrlMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGenerateAttachmentDownloadUrlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateAttachmentDownloadUrlMutation, GenerateAttachmentDownloadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateAttachmentDownloadUrlMutation, GenerateAttachmentDownloadUrlMutationVariables>(GenerateAttachmentDownloadUrlDocument, options);
      }
export type GenerateAttachmentDownloadUrlMutationHookResult = ReturnType<typeof useGenerateAttachmentDownloadUrlMutation>;
export type GenerateAttachmentDownloadUrlMutationResult = Apollo.MutationResult<GenerateAttachmentDownloadUrlMutation>;
export type GenerateAttachmentDownloadUrlMutationOptions = Apollo.BaseMutationOptions<GenerateAttachmentDownloadUrlMutation, GenerateAttachmentDownloadUrlMutationVariables>;
export const RemoveLabelFromTaskDocument = gql`
    mutation RemoveLabelFromTask($taskId: String!, $labelId: String!) {
  removeLabelFromTask(taskId: $taskId, labelId: $labelId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type RemoveLabelFromTaskMutationFn = Apollo.MutationFunction<RemoveLabelFromTaskMutation, RemoveLabelFromTaskMutationVariables>;

/**
 * __useRemoveLabelFromTaskMutation__
 *
 * To run a mutation, you first call `useRemoveLabelFromTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLabelFromTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLabelFromTaskMutation, { data, loading, error }] = useRemoveLabelFromTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      labelId: // value for 'labelId'
 *   },
 * });
 */
export function useRemoveLabelFromTaskMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLabelFromTaskMutation, RemoveLabelFromTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLabelFromTaskMutation, RemoveLabelFromTaskMutationVariables>(RemoveLabelFromTaskDocument, options);
      }
export type RemoveLabelFromTaskMutationHookResult = ReturnType<typeof useRemoveLabelFromTaskMutation>;
export type RemoveLabelFromTaskMutationResult = Apollo.MutationResult<RemoveLabelFromTaskMutation>;
export type RemoveLabelFromTaskMutationOptions = Apollo.BaseMutationOptions<RemoveLabelFromTaskMutation, RemoveLabelFromTaskMutationVariables>;
export const SendCommentDocument = gql`
    mutation SendComment($data: SendCommentInput!) {
  sendComment(data: $data) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;
export type SendCommentMutationFn = Apollo.MutationFunction<SendCommentMutation, SendCommentMutationVariables>;

/**
 * __useSendCommentMutation__
 *
 * To run a mutation, you first call `useSendCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendCommentMutation, { data, loading, error }] = useSendCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendCommentMutation(baseOptions?: Apollo.MutationHookOptions<SendCommentMutation, SendCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendCommentMutation, SendCommentMutationVariables>(SendCommentDocument, options);
      }
export type SendCommentMutationHookResult = ReturnType<typeof useSendCommentMutation>;
export type SendCommentMutationResult = Apollo.MutationResult<SendCommentMutation>;
export type SendCommentMutationOptions = Apollo.BaseMutationOptions<SendCommentMutation, SendCommentMutationVariables>;
export const UnassignTaskDocument = gql`
    mutation UnassignTask($taskId: String!, $userId: String!) {
  unassignTask(taskId: $taskId, userId: $userId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type UnassignTaskMutationFn = Apollo.MutationFunction<UnassignTaskMutation, UnassignTaskMutationVariables>;

/**
 * __useUnassignTaskMutation__
 *
 * To run a mutation, you first call `useUnassignTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignTaskMutation, { data, loading, error }] = useUnassignTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnassignTaskMutation(baseOptions?: Apollo.MutationHookOptions<UnassignTaskMutation, UnassignTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnassignTaskMutation, UnassignTaskMutationVariables>(UnassignTaskDocument, options);
      }
export type UnassignTaskMutationHookResult = ReturnType<typeof useUnassignTaskMutation>;
export type UnassignTaskMutationResult = Apollo.MutationResult<UnassignTaskMutation>;
export type UnassignTaskMutationOptions = Apollo.BaseMutationOptions<UnassignTaskMutation, UnassignTaskMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($data: UpdateCommentInput!) {
  updateComment(data: $data) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: String!, $data: UpdateTaskInput!) {
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
export const UpdateTaskLinkDocument = gql`
    mutation UpdateTaskLink($linkId: String!, $data: TaskLinkInput!) {
  updateTaskLink(linkId: $linkId, data: $data)
}
    `;
export type UpdateTaskLinkMutationFn = Apollo.MutationFunction<UpdateTaskLinkMutation, UpdateTaskLinkMutationVariables>;

/**
 * __useUpdateTaskLinkMutation__
 *
 * To run a mutation, you first call `useUpdateTaskLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskLinkMutation, { data, loading, error }] = useUpdateTaskLinkMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskLinkMutation, UpdateTaskLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskLinkMutation, UpdateTaskLinkMutationVariables>(UpdateTaskLinkDocument, options);
      }
export type UpdateTaskLinkMutationHookResult = ReturnType<typeof useUpdateTaskLinkMutation>;
export type UpdateTaskLinkMutationResult = Apollo.MutationResult<UpdateTaskLinkMutation>;
export type UpdateTaskLinkMutationOptions = Apollo.BaseMutationOptions<UpdateTaskLinkMutation, UpdateTaskLinkMutationVariables>;
export const UploadTaskAttachmentDocument = gql`
    mutation UploadTaskAttachment($taskId: String!, $file: Upload!) {
  uploadTaskAttachment(taskId: $taskId, file: $file)
}
    `;
export type UploadTaskAttachmentMutationFn = Apollo.MutationFunction<UploadTaskAttachmentMutation, UploadTaskAttachmentMutationVariables>;

/**
 * __useUploadTaskAttachmentMutation__
 *
 * To run a mutation, you first call `useUploadTaskAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadTaskAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadTaskAttachmentMutation, { data, loading, error }] = useUploadTaskAttachmentMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadTaskAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<UploadTaskAttachmentMutation, UploadTaskAttachmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadTaskAttachmentMutation, UploadTaskAttachmentMutationVariables>(UploadTaskAttachmentDocument, options);
      }
export type UploadTaskAttachmentMutationHookResult = ReturnType<typeof useUploadTaskAttachmentMutation>;
export type UploadTaskAttachmentMutationResult = Apollo.MutationResult<UploadTaskAttachmentMutation>;
export type UploadTaskAttachmentMutationOptions = Apollo.BaseMutationOptions<UploadTaskAttachmentMutation, UploadTaskAttachmentMutationVariables>;
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
export const FindDocumentByIdDocument = gql`
    query FindDocumentById($id: String!) {
  findDocumentById(documentId: $id) {
    ...Document
  }
}
    ${DocumentFragmentDoc}`;

/**
 * __useFindDocumentByIdQuery__
 *
 * To run a query within a React component, call `useFindDocumentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDocumentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDocumentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindDocumentByIdQuery(baseOptions: Apollo.QueryHookOptions<FindDocumentByIdQuery, FindDocumentByIdQueryVariables> & ({ variables: FindDocumentByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindDocumentByIdQuery, FindDocumentByIdQueryVariables>(FindDocumentByIdDocument, options);
      }
export function useFindDocumentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDocumentByIdQuery, FindDocumentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindDocumentByIdQuery, FindDocumentByIdQueryVariables>(FindDocumentByIdDocument, options);
        }
export function useFindDocumentByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindDocumentByIdQuery, FindDocumentByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindDocumentByIdQuery, FindDocumentByIdQueryVariables>(FindDocumentByIdDocument, options);
        }
export type FindDocumentByIdQueryHookResult = ReturnType<typeof useFindDocumentByIdQuery>;
export type FindDocumentByIdLazyQueryHookResult = ReturnType<typeof useFindDocumentByIdLazyQuery>;
export type FindDocumentByIdSuspenseQueryHookResult = ReturnType<typeof useFindDocumentByIdSuspenseQuery>;
export type FindDocumentByIdQueryResult = Apollo.QueryResult<FindDocumentByIdQuery, FindDocumentByIdQueryVariables>;
export const FindDocumentsByProjectDocument = gql`
    query FindDocumentsByProject {
  findDocumentsByProject {
    id
    title
    projectId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFindDocumentsByProjectQuery__
 *
 * To run a query within a React component, call `useFindDocumentsByProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDocumentsByProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDocumentsByProjectQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindDocumentsByProjectQuery(baseOptions?: Apollo.QueryHookOptions<FindDocumentsByProjectQuery, FindDocumentsByProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindDocumentsByProjectQuery, FindDocumentsByProjectQueryVariables>(FindDocumentsByProjectDocument, options);
      }
export function useFindDocumentsByProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDocumentsByProjectQuery, FindDocumentsByProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindDocumentsByProjectQuery, FindDocumentsByProjectQueryVariables>(FindDocumentsByProjectDocument, options);
        }
export function useFindDocumentsByProjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindDocumentsByProjectQuery, FindDocumentsByProjectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindDocumentsByProjectQuery, FindDocumentsByProjectQueryVariables>(FindDocumentsByProjectDocument, options);
        }
export type FindDocumentsByProjectQueryHookResult = ReturnType<typeof useFindDocumentsByProjectQuery>;
export type FindDocumentsByProjectLazyQueryHookResult = ReturnType<typeof useFindDocumentsByProjectLazyQuery>;
export type FindDocumentsByProjectSuspenseQueryHookResult = ReturnType<typeof useFindDocumentsByProjectSuspenseQuery>;
export type FindDocumentsByProjectQueryResult = Apollo.QueryResult<FindDocumentsByProjectQuery, FindDocumentsByProjectQueryVariables>;
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
export const FindCommentsByTaskDocument = gql`
    query FindCommentsByTask($taskId: String!) {
  findCommentsByTask(taskId: $taskId) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useFindCommentsByTaskQuery__
 *
 * To run a query within a React component, call `useFindCommentsByTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCommentsByTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCommentsByTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useFindCommentsByTaskQuery(baseOptions: Apollo.QueryHookOptions<FindCommentsByTaskQuery, FindCommentsByTaskQueryVariables> & ({ variables: FindCommentsByTaskQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCommentsByTaskQuery, FindCommentsByTaskQueryVariables>(FindCommentsByTaskDocument, options);
      }
export function useFindCommentsByTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCommentsByTaskQuery, FindCommentsByTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCommentsByTaskQuery, FindCommentsByTaskQueryVariables>(FindCommentsByTaskDocument, options);
        }
export function useFindCommentsByTaskSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCommentsByTaskQuery, FindCommentsByTaskQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCommentsByTaskQuery, FindCommentsByTaskQueryVariables>(FindCommentsByTaskDocument, options);
        }
export type FindCommentsByTaskQueryHookResult = ReturnType<typeof useFindCommentsByTaskQuery>;
export type FindCommentsByTaskLazyQueryHookResult = ReturnType<typeof useFindCommentsByTaskLazyQuery>;
export type FindCommentsByTaskSuspenseQueryHookResult = ReturnType<typeof useFindCommentsByTaskSuspenseQuery>;
export type FindCommentsByTaskQueryResult = Apollo.QueryResult<FindCommentsByTaskQuery, FindCommentsByTaskQueryVariables>;
export const FindTaskAttachmentsDocument = gql`
    query FindTaskAttachments($taskId: String!) {
  findTaskAttachments(taskId: $taskId) {
    id
    filename
    filepath
    mimeType
    size
    createdAt
  }
}
    `;

/**
 * __useFindTaskAttachmentsQuery__
 *
 * To run a query within a React component, call `useFindTaskAttachmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTaskAttachmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTaskAttachmentsQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useFindTaskAttachmentsQuery(baseOptions: Apollo.QueryHookOptions<FindTaskAttachmentsQuery, FindTaskAttachmentsQueryVariables> & ({ variables: FindTaskAttachmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTaskAttachmentsQuery, FindTaskAttachmentsQueryVariables>(FindTaskAttachmentsDocument, options);
      }
export function useFindTaskAttachmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTaskAttachmentsQuery, FindTaskAttachmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTaskAttachmentsQuery, FindTaskAttachmentsQueryVariables>(FindTaskAttachmentsDocument, options);
        }
export function useFindTaskAttachmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindTaskAttachmentsQuery, FindTaskAttachmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTaskAttachmentsQuery, FindTaskAttachmentsQueryVariables>(FindTaskAttachmentsDocument, options);
        }
export type FindTaskAttachmentsQueryHookResult = ReturnType<typeof useFindTaskAttachmentsQuery>;
export type FindTaskAttachmentsLazyQueryHookResult = ReturnType<typeof useFindTaskAttachmentsLazyQuery>;
export type FindTaskAttachmentsSuspenseQueryHookResult = ReturnType<typeof useFindTaskAttachmentsSuspenseQuery>;
export type FindTaskAttachmentsQueryResult = Apollo.QueryResult<FindTaskAttachmentsQuery, FindTaskAttachmentsQueryVariables>;
export const FindTaskByIdDocument = gql`
    query FindTaskById($id: String!) {
  findTask(taskId: $id) {
    id
    title
    description
    status
    priority
    position
    startDate
    dueDate
    createdBy {
      avatar
      displayName
    }
    assignees {
      id
      userId
      user {
        id
        username
        displayName
        avatar
      }
    }
    labels {
      id
      name
      color
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFindTaskByIdQuery__
 *
 * To run a query within a React component, call `useFindTaskByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTaskByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTaskByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindTaskByIdQuery(baseOptions: Apollo.QueryHookOptions<FindTaskByIdQuery, FindTaskByIdQueryVariables> & ({ variables: FindTaskByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTaskByIdQuery, FindTaskByIdQueryVariables>(FindTaskByIdDocument, options);
      }
export function useFindTaskByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTaskByIdQuery, FindTaskByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTaskByIdQuery, FindTaskByIdQueryVariables>(FindTaskByIdDocument, options);
        }
export function useFindTaskByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindTaskByIdQuery, FindTaskByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTaskByIdQuery, FindTaskByIdQueryVariables>(FindTaskByIdDocument, options);
        }
export type FindTaskByIdQueryHookResult = ReturnType<typeof useFindTaskByIdQuery>;
export type FindTaskByIdLazyQueryHookResult = ReturnType<typeof useFindTaskByIdLazyQuery>;
export type FindTaskByIdSuspenseQueryHookResult = ReturnType<typeof useFindTaskByIdSuspenseQuery>;
export type FindTaskByIdQueryResult = Apollo.QueryResult<FindTaskByIdQuery, FindTaskByIdQueryVariables>;
export const FindTaskLinksDocument = gql`
    query FindTaskLinks($taskId: String!) {
  findTaskLinks(taskId: $taskId) {
    id
    title
    url
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFindTaskLinksQuery__
 *
 * To run a query within a React component, call `useFindTaskLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTaskLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTaskLinksQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useFindTaskLinksQuery(baseOptions: Apollo.QueryHookOptions<FindTaskLinksQuery, FindTaskLinksQueryVariables> & ({ variables: FindTaskLinksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTaskLinksQuery, FindTaskLinksQueryVariables>(FindTaskLinksDocument, options);
      }
export function useFindTaskLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTaskLinksQuery, FindTaskLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTaskLinksQuery, FindTaskLinksQueryVariables>(FindTaskLinksDocument, options);
        }
export function useFindTaskLinksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindTaskLinksQuery, FindTaskLinksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTaskLinksQuery, FindTaskLinksQueryVariables>(FindTaskLinksDocument, options);
        }
export type FindTaskLinksQueryHookResult = ReturnType<typeof useFindTaskLinksQuery>;
export type FindTaskLinksLazyQueryHookResult = ReturnType<typeof useFindTaskLinksLazyQuery>;
export type FindTaskLinksSuspenseQueryHookResult = ReturnType<typeof useFindTaskLinksSuspenseQuery>;
export type FindTaskLinksQueryResult = Apollo.QueryResult<FindTaskLinksQuery, FindTaskLinksQueryVariables>;
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
export const DocumentChangedDocument = gql`
    subscription DocumentChanged($id: String!) {
  documentChanged(documentId: $id) {
    ...Document
  }
}
    ${DocumentFragmentDoc}`;

/**
 * __useDocumentChangedSubscription__
 *
 * To run a query within a React component, call `useDocumentChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDocumentChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentChangedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDocumentChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<DocumentChangedSubscription, DocumentChangedSubscriptionVariables> & ({ variables: DocumentChangedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<DocumentChangedSubscription, DocumentChangedSubscriptionVariables>(DocumentChangedDocument, options);
      }
export type DocumentChangedSubscriptionHookResult = ReturnType<typeof useDocumentChangedSubscription>;
export type DocumentChangedSubscriptionResult = Apollo.SubscriptionResult<DocumentChangedSubscription>;
export const CommentChangedDocument = gql`
    subscription CommentChanged($taskId: String!) {
  commentChanged(taskId: $taskId) {
    mutation
    comment {
      ...Comment
    }
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useCommentChangedSubscription__
 *
 * To run a query within a React component, call `useCommentChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentChangedSubscription({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useCommentChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<CommentChangedSubscription, CommentChangedSubscriptionVariables> & ({ variables: CommentChangedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CommentChangedSubscription, CommentChangedSubscriptionVariables>(CommentChangedDocument, options);
      }
export type CommentChangedSubscriptionHookResult = ReturnType<typeof useCommentChangedSubscription>;
export type CommentChangedSubscriptionResult = Apollo.SubscriptionResult<CommentChangedSubscription>;
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