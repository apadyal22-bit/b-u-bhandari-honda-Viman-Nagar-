export type VisitType = 'purchase' | 'service' | 'delivery';

export type StarRating = 1 | 2 | 3 | 4 | 5;

export interface CustomerFeedback {
  visitType: VisitType | null;
  rating: StarRating | null;
  selectedHighlights: string[];
  employeeName: string;
  teamDepartment: string;
  additionalRemarks: string;
  generatedReview: string;
}

export interface AppSettings {
  locationName: string;
  reviewLink: string;
}

export const DEFAULT_LOCATION = 'B.U. Bhandari Honda – Viman Nagar';
export const DEFAULT_REVIEW_LINK = 'https://g.page/r/CRccM-7UXmutEBM/review';

export const HIGHLIGHT_OPTIONS = [
  'Staff Behaviour',
  'Quick Service',
  'Vehicle Delivery',
  'Vehicle Explanation',
  'Professional Team',
  'Clean Showroom',
  'Good Support',
  'Transparent Process',
  'Friendly Staff',
  'Overall Experience',
];

export const RATING_LABELS: Record<StarRating, string> = {
  1: 'Poor',
  2: 'Needs Improvement',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};
