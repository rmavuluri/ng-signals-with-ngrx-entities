import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { User } from './user.model';
import { UsersService } from './users.service';

/*
SignalStore: A lightweight state management solution from NgRx, built on top of Signals.
signalStore() Function: Creates a SignalStore instance.
withState() Feature: Defines the initial state and creates signals for state properties.
withComputed() Feature: Creates derived signals based on existing signals.
withMethods() Feature: Adds methods to the store for state updates.
patchState() Helper: Updates a specific state property within the store. */

type State = { users: User[]; isLoading: boolean; query: string };

const initialState: State = {
  users: [],
  isLoading: false,
  query: '',
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, usersService = inject(UsersService)) => ({
    updateQuery(query: string) {
      patchState(store, { query });
    },
    async loadAll() {
      patchState(store, { isLoading: true });
      const users = await usersService.getAll();
      patchState(store, { users, isLoading: false });
    },
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) =>
          usersService.getByQuery(query).pipe(
            tapResponse({
              next: (users) => patchState(store, { users }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit({ loadByQuery, query }) {
      loadByQuery(query);
    },
  })
);
