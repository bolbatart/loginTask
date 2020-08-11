import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { setToInitial } from '../store/actions/signInAction';

export default function GreetingModal(props) {
  const { isOpen } = props;
  const dispatch = useDispatch();

  function logout() {
    dispatch(setToInitial());
    localStorage.removeItem('jwt-token');
    window.location.reload(false);
  }
  return (
    <div>
      <Modal isOpen={isOpen || localStorage.getItem('jwt-token')}>
        <ModalHeader>Congratulations!</ModalHeader>
        <ModalBody>
          You are successfully logged in! Now you can find a jwt token in the
          localstorage, which does not have expiration time. If you will refresh
          this page you will be authenticated and will see this modal window. To
          delete this token click the Log Out button.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={logout}>
            Log Out
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
