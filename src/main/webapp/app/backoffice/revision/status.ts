import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

export const reviewStates = [
  { value: ReviewState.Hold, label: 'Em espera' },
  { value: ReviewState.OnGoing, label: 'Em curso' },
  { value: ReviewState.Pending, label: 'Pendente' },
  { value: ReviewState.Reviewed, label: 'Revista' },
  { value: ReviewState.Accepted, label: 'Aceite' }
];
