import * as Sentry from '@sentry/browser';
import { commitLocalUpdate } from 'react-relay';
import { useRelayEnvironment } from 'react-relay/hooks';
import { toast } from 'react-toastify';
import { useMutation } from 'relay-hooks/lib';
import { ROOT_ID } from 'relay-runtime';

import { UserAuthMutation } from './mutations/UserAuthMutation';

export const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'NO_CODE_AG_ACCESS_TOKEN';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN);

export const isLoggedIn = () => {
  const token = getAccessToken();
  return token !== 'null' && !!token;
};

export const useAuthUser = () => {
  const environment = useRelayEnvironment();

  const loginUpdater = store => {
    const me = store.getRootField('UserAuth').getLinkedRecord('me');
    if (!me) return;
    store.get(ROOT_ID).setLinkedRecord(me, 'me');
  };

  const logoffUpdater = store => {
    const me = store.get(ROOT_ID).getLinkedRecord('me');
    if (!me) return;
    return store.delete(me.getDataID());
  };

  const onCompleted = data => {
    const { UserAuth } = data;
    const { token, me = {} } = UserAuth;
    const { name = '' } = me;
    console.log(ACCESS_TOKEN)
    localStorage.setItem(ACCESS_TOKEN, token);
    toast.info(`Welcome ${name.split(' ')[0]}!`, { autoClose: 3000 });
  };

  const logoffUser = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    commitLocalUpdate(environment, logoffUpdater);
    toast.info(`Goodbye!`, { autoClose: 3000 });
  };

  const [mutate] = useMutation(UserAuthMutation, {
    onCompleted,
    updater: loginUpdater,
  });

  const authUser = async ({ tokenId }: { tokenId: string }) => {
    try {
      await mutate({ variables: { input: { token: tokenId } } });

    } catch (e) {
      Sentry.captureException(e);
    }
  };

  return { authUser, logoffUser };
};
