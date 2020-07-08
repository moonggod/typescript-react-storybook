/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: member
// ====================================================

export interface member_member {
  __typename: "member";
  /**
   * id
   */
  id: string | null;
  /**
   * 账号
   */
  account: string | null;
  /**
   * 会员头像
   */
  avatarUrl: string | null;
  /**
   * 创建时间
   */
  createTime: number | null;
  /**
   * 用户名称
   */
  userName: string | null;
}

export interface member {
  /**
   * 获取会员信息
   */
  member: member_member | null;
}
