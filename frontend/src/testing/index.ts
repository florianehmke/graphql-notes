import { Subject } from 'rxjs';

export function forSubject<T>(item: T, subject: Subject<T>): T {
  subject.next(item);
  return item;
}