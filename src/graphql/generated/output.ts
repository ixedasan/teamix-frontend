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
  role: Scalars['String']['input'];
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
  projectId: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  changeTaskStatus: TaskModel;
  clearSessionCookie: Scalars['Boolean']['output'];
  createDocument: Scalars['Boolean']['output'];
  createProject: Scalars['Boolean']['output'];
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
  updateProjectInfo: Scalars['Boolean']['output'];
  updateSocialLink: Scalars['Boolean']['output'];
  updateTask: TaskModel;
  updateTaskLink: Scalars['Boolean']['output'];
  uploadTaskAttachment: Scalars['Boolean']['output'];
  verifyAccaunt: UserModel;
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


export type MutationUpdateProjectInfoArgs = {
  data: ProjectInput;
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
  name: Scalars['String']['input'];
};

export type ProjectModel = {
  __typename?: 'ProjectModel';
  cover?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  members: Array<MemberModel>;
  name: Scalars['String']['output'];
  plan: ProjectStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ProjectStatus {
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
  taskChanged: TaskModel;
};


export type SubscriptionCommentAddedArgs = {
  taskId: Scalars['String']['input'];
};


export type SubscriptionDocumentUpdatedArgs = {
  projectId: Scalars['String']['input'];
};


export type SubscriptionTaskChangedArgs = {
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

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { __typename?: 'Query', findProfile: { __typename?: 'UserModel', id: string, username: string, email: string, displayName: string, avatar?: string | null, socialLinks: Array<{ __typename?: 'SocialLinksModel', title: string, url: string, position: number }> } };


export const FindProfileDocument = gql`
    query FindProfile {
  findProfile {
    id
    username
    email
    displayName
    avatar
    socialLinks {
      title
      url
      position
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