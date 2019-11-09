import { Exercise } from '../exercise/exercise';

export class Workout {
  created?: string;
  _id?: string;
  name: string;
  description: string;
  ownerId: string;
  exerciseIds?: string[];
  exercises?: Exercise[];
}
