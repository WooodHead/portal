/** @format */

import type React from 'react';
import { TFunction } from 'next-i18next';

export interface DocFlowLegalPrivatePersonSOAP {
  name?: string;
  objectID: {
    id?: string;
    presentation?: string;
    type?: string;
    navigationRef?: string;
  };
}

export interface DocFlowOrganizationSOAP {
  name?: string;
  objectID: {
    id?: string;
    presentation?: string;
    type?: string;
    navigationRef?: string;
  };
  legalPrivatePerson?: DocFlowLegalPrivatePersonSOAP;
  inn?: string;
  kpp?: string;
  fullName?: string;
  VATpayer?: boolean;
}

export interface DocFlowSubdivisionSOAP {
  name?: string;
  objectID: {
    id?: string;
    presentation?: string;
    type?: string;
    navigationRef?: string;
  };
}

export interface DocFlowApprovalResultSOAP {
  name?: string;
  objectID: {
    id?: string;
    presentation?: string;
    type?: string;
    navigationRef?: string;
  };
}

export interface DocFlowVisaSOAP {
  addedBy?: DocFlowUserSOAP;
  comment?: string;
  date?: Date;
  name?: string;
  objectID: {
    id?: string;
    presentation?: string;
    type?: string;
    navigationRef?: string;
  };
  result?: DocFlowApprovalResultSOAP;
  reviewer?: DocFlowUserSOAP;
  signatureChecked?: boolean;
  signatureValid?: boolean;
  signed?: boolean;
}

export interface DocFlowInternalDocumentSOAP {
  name?: string;
  objectID: {
    id?: string;
    presentation?: string;
    type?: string; // DMInternalDocument
    navigationRef?: string;
  };
  organization?: DocFlowOrganizationSOAP;
  regDate?: Date;
  responsible?: DocFlowUserSOAP;
  regNumber?: string;
  status?: DocFlowStatusSOAP;
  statusChangeEnabled?: boolean;
  statusEnabled?: boolean;
  statusApproval?: DocFlowStatusSOAP;
  statusPerformance?: DocFlowStatusSOAP;
  statusRegistration?: DocFlowStatusSOAP;
  subdivision?: DocFlowSubdivisionSOAP;
  summary?: string;
  title?: string;
  organizationEnabled?: boolean;
  author?: DocFlowUserSOAP;
  beginDate?: Date;
  openEnded?: boolean;
  files?: DocFlowFileSOAP[];
  visas?: DocFlowVisaSOAP[];
}

export interface DocFlowRoleSOAP {
  name: string;
  objectID: {
    id: string;
    navigationRef?: string;
    presentation?: string;
    type?: string; // 'DMBusinessProcessTargetRole';
  };
}

export interface DocFlowTargetSOAP {
  allowDeletion: boolean;
  name: string;
  role: DocFlowRoleSOAP;
  target: DocFlowInternalDocumentSOAP;
}

export interface DocFlowFileVersionSOAP {
  name?: string;
  objectID: {
    id: string;
    presentation?: string;
    navigationRef?: string;
    type?: string; // 'DMFileVersion'
  };
}

export interface DocFlowFileSOAP {
  name?: string;
  author?: DocFlowUserSOAP;
  activeVersion?: DocFlowFileVersionSOAP;
  attributes?: string;
  binaryData?: string;
  extension?: string;
  modificationDateUniversal?: Date;
  creationDate?: Date;
  encrypted?: boolean;
  signed?: boolean;
  description?: string;
  editing?: boolean;
  editingUser?: DocFlowUserSOAP;
  size?: number;
  objectID: {
    id: string;
    presentation?: string;
    navigationRef?: string;
    type?: string; // 'DMFile'
  };
}

export interface DocFlowUserSOAP {
  name?: string;
  objectID?: {
    id?: string;
    navigationRef?: string;
    presentation?: string;
    type?: string; // 'DMUser';
  };
}

export interface DocFlowImportanceSOAP {
  name?: string;
  objectID: {
    id?: string;
    presentation?: string;
    navigationRef?: string;
    type?: string; // 'DMBusinessProcessTaskImportance';
  };
}

export interface DocFlowProcessAcquaintanceSOAP {
  name?: string;
  objectID: {
    id?: string;
    navigationRef?: string;
    presentation?: string;
    type?: string; // 'DMBusinessProcessAcquaintance';
  };
  author?: DocFlowUserSOAP;
  beginDate?: Date;
  blockedByTemplate?: boolean;
  completed?: boolean;
  description?: string;
  dueDate?: Date;
  dueTimeEnabled?: boolean;
  executionComment?: string;
  importance?: DocFlowImportanceSOAP;
  leadingTaskEnabled?: boolean;
  parentTaskEnabled?: boolean;
  performers?: DocFlowUserSOAP[];
  started?: boolean;
  state?: DocFlowStateSOAP;
  stateEnabled?: boolean;
  target?: DocFlowInternalDocumentSOAP;
  targets?: {
    items?: DocFlowTargetSOAP[];
  };
}

export interface DocFlowStatusSOAP {
  name?: string;
  objectID: {
    id?: string;
    navigationRef?: string;
    presentation?: string;
    type?: string; // 'DMDocumentStatus';
  };
}

export interface DocFlowStateSOAP {
  name?: string;
  objectID?: {
    id?: string;
    navigationRef?: string;
    presentation?: string;
    type?: string; // 'DMBusinessProcessState';
  };
}

export interface DocFlowTaskSOAP {
  name?: string;
  acceptDate?: Date;
  accepted?: boolean;
  attributes?: {
    type?: string; // 'DMBusinessProcessTask';
  };
  author?: DocFlowUserSOAP;
  beginDate?: Date;
  businessProcessStep?: string;
  changeRight?: boolean;
  description?: string;
  dueDate?: Date;
  endDate?: Date;
  executed?: boolean;
  executionComment?: string;
  executionMark?: string;
  importance?: DocFlowImportanceSOAP;
  number?: string;
  objectID?: {
    id?: string;
    navigationRef?: string;
    presentation?: string;
    type?: string; // 'DMBusinessProcessTask';
  };
  parentBusinessProcess?: DocFlowProcessAcquaintanceSOAP;
  performer?: {
    user?: DocFlowUserSOAP;
  };
  state?: DocFlowStateSOAP;
  target?: DocFlowInternalDocumentSOAP;
  targets?: {
    items?: DocFlowTargetSOAP[];
  };
  htmlView?: string;
}
