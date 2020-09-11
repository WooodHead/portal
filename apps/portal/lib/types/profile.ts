/** @format */

//#region Imports NPM
import type React from 'react';
import type { WithTranslation } from 'next-i18next';
import type { ApolloQueryResult } from '@apollo/client';
import type { Order, Connection } from 'typeorm-graphql-pagination';
import type { OutlinedInputProps } from '@material-ui/core';
//#endregion
//#region Imports Local
import type { StyleProps as StyleProperties, Data } from './common';
import type { User } from './user.dto';
import type { Profile, SearchSuggestions, ProfileInput } from './profile.dto';
//#endregion

export type PhonebookColumnNames =
  | 'lastName'
  | 'nameEng'
  | 'username'
  | 'thumbnailPhoto'
  | 'thumbnailPhoto40'
  | 'company'
  | 'companyEng'
  | 'management'
  | 'managementEng'
  | 'department'
  | 'departmentEng'
  | 'division'
  | 'divisionEng'
  | 'title'
  | 'positionEng'
  | 'manager'
  | 'room'
  | 'telephone'
  | 'fax'
  | 'mobile'
  | 'workPhone'
  | 'email'
  | 'country'
  | 'region'
  | 'town'
  | 'street'
  | 'disabled'
  | 'notShowing';

export interface PhonebookColumn {
  name: PhonebookColumnNames;
  admin: boolean;
  defaultStyle: StyleProperties;
  largeStyle: StyleProperties;
}

export interface ProfileQueryProps {
  first: number;
  after: string;
  orderBy: Order<PhonebookColumnNames>;
  search: string;
  disabled: boolean;
  notShowing: boolean;
}

export interface PhonebookSearchProps {
  search: string;
  suggestions: SearchSuggestions[];
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
  handleSugClose: (_: React.MouseEvent<EventTarget>) => void;
  handleSugKeyDown: (_: React.KeyboardEvent) => void;
  handleSugClick: (_: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  handleHelpOpen: () => void;
  handleSettingsOpen: () => void;
}

export interface ProfileProps extends WithTranslation {
  profileId: string;
  handleClose(): void;
  handleSearch(text: string): void;
}

export interface SettingsProps extends WithTranslation {
  columns: PhonebookColumnNames[];
  handleClose: () => void;
  handleReset: () => void;
  changeColumn(columns: PhonebookColumnNames[]): void;
  isAdmin: boolean;
}

export interface PhonebookHelpProps extends WithTranslation {
  onClose: () => void;
}

export interface HeaderPropsRef {
  style: React.CSSProperties;
}

export interface PhonebookHeaderContextProps {
  columns: PhonebookColumnNames[];
  orderBy: Order<PhonebookColumnNames>;
  handleSort: (column: PhonebookColumnNames) => () => void;
  largeWidth: boolean;
}

export interface TableProps {
  hasLoadMore: boolean;
  loadMoreItems: () => Promise<undefined | ApolloQueryResult<Data<'profile', Connection<Profile>>>>;
  columns: PhonebookColumnNames[];
  orderBy: Order<PhonebookColumnNames>;
  handleSort: (_: PhonebookColumnNames) => () => void;
  largeWidth: boolean;
  data: Connection<Profile>;
}

export interface PhonebookProfileControlProps {
  controlEl: HTMLElement | null;
  profileId?: string;
  handleControl: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseControl: () => void;
}

export interface PhonebookProfileModule<T extends string | number | symbol> {
  profile?: Profile;
  classes: Record<T, string>;
}

export interface PhonebookProfileNameProps extends PhonebookProfileModule<'root'> {
  type: 'firstName' | 'lastName' | 'middleName';
}

export interface PhonebookProfileFieldProps extends PhonebookProfileModule<'root' | 'pointer'> {
  last?: boolean;
  onClick?: (_?: Profile | string) => () => void;
  title: string;
  field:
    | 'company'
    | 'title'
    | 'management'
    | 'department'
    | 'division'
    | 'manager'
    | 'country'
    | 'region'
    | 'town'
    | 'street'
    | 'room'
    | 'postalCode';
}

export interface HelpDataProps {
  id: number;
  image: any;
  text: React.ReactNode;
}

export interface ProfileEditComponentProps {
  isAdmin: boolean;
  newProfile?: boolean;
  loadingCheckUsername?: boolean;
  loadingProfile: boolean;
  loadingChanged: boolean;
  hasUpdate: boolean;
  profile?: Profile | ProfileInput;
  locale?: User['settings']['lng'];
  onDrop: (_: any) => Promise<void>;
  handleCheckUsername?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange: (_: keyof Profile | keyof ProfileInput, ___?: string) => (__: React.ChangeEvent<HTMLInputElement>) => void;
  handleBirthday: (date: Date) => void;
  handleSave: () => void;
}

export interface TextFieldComponentProps {
  disabled: boolean;
  handleChange: (_: keyof Profile, ___?: string) => (__: React.ChangeEvent<Record<any, any>>) => void;
  field: keyof Profile;
  value?: any;
  InputProps: Partial<OutlinedInputProps>;
  fullWidth?: boolean;
}
