/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NavTab = 'new_project' | 'dashboard' | 'projects' | 'personalization';

export interface NavItem {
  id: NavTab;
  label: string;
  iconName: string;
  badge?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  creditsUsed: number;
  creditsTotal: number;
}
