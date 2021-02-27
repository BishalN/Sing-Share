import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  comment,
  deleteComment,
  deleteMyRecording,
  editComment,
  editMyRecording,
  getMyRecordings,
  toggleLikeRecording,
} from '../store/actions/recordingsAction';

interface RecordingsCardProps {
  title: string;
  tags: string;
  likes: number;
  comments: number;
  fileUri: string;
  description: string;
  isPublic: string;
  recordingId: string;
  isMyRecording?: boolean;
  isLiked;
  loggedInuserAvatar: string;
  commentsArry;
  username;
}

export const RecordingsCard: React.FC<RecordingsCardProps> = ({
  title,
  comments,
  likes,
  loggedInuserAvatar,
  recordingId,
  tags,
  fileUri,
  description,
  isPublic,
  isMyRecording,
  isLiked,
  children,
  commentsArry,
  username,
}) => {
  const [commentsArray, setCommentsArray] = useState(commentsArry);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenComment,
    onOpen: onOpenComment,
    onClose: onCloseComment,
  } = useDisclosure();
  const commentInitialRef = useRef();

  const initialRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  const [isOpenAlert, setIsAlertOpen] = useState(false);
  const onCloseAlert = () => setIsAlertOpen(false);
  const cancelRef = useRef();

  const [recTitle, setRecTitle] = useState(title);
  const [recIsLiked, setRecIsLiked] = useState(isLiked());
  const [recTags, setRecTags] = useState(tags);
  const [recDescription, setRecDescription] = useState(description);
  const [recAccessibilityStatus, setRecAccessibilityStatus] = useState(
    Boolean(isPublic)
  );
  const [commentValue, setcommentValue] = useState('');
  const [isNewCommentAdded, setIsNewCommentAdded] = useState(false);
  const [isEditCommentTriggered, setIsEditCommentTriggered] = useState({
    bool: false,
    index: null,
  });
  const [editCommentText, setEditCommentText] = useState('');

  const editMyRecordingFromStore = useSelector(
    (state: any) => state.editMyRecording
  );
  const { loading, recordingInfo, error } = editMyRecordingFromStore;

  const deleteMyRecordingFromStore = useSelector(
    (state: any) => state.deleteMyRecording
  );
  const { loading: loadingDelete, message } = deleteMyRecordingFromStore;

  const deleteCommentFromStore = useSelector(
    (state: any) => state.deleteComment
  );
  const {
    loading: loadingDeleteComment,
    comments: newComments,
  } = deleteCommentFromStore;

  //recent comment made by the user from the store
  const commentRecordingFromStore = useSelector(
    (state: any) => state.commentRecording
  );
  const {
    loading: loadingAddComment,
    comment: newlyAddedComment,
  } = commentRecordingFromStore;
  if (isNewCommentAdded && newlyAddedComment && !loadingAddComment) {
    setCommentsArray([
      {
        avatar: newlyAddedComment.avatar,
        comment: newlyAddedComment.comment,
        username: newlyAddedComment.username,
        _id: newlyAddedComment._id,
        user: newlyAddedComment.user,
      },
      ...commentsArray,
    ]);

    //setting it back to false
    setIsNewCommentAdded(false);
  }

  const editCommentFromStore = useSelector((state: any) => state.editComment);
  const { loading: loadingEditComment, editedComment } = editCommentFromStore;

  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    loading: loadingUserLogin,
    error: errorUserLogin,
    userInfo: userInfoUserLogin,
  } = userLogin;

  const toggleLikeHandler = () => {
    if (!userInfoUserLogin || userInfoUserLogin.length === 0) {
      toast({
        title: 'Sorry!',
        status: 'error',
        description: 'You have to be logged in to like a recording',
        isClosable: true,
        position: 'bottom-left',
      });
    } else {
      setRecIsLiked(!recIsLiked);
      dispatch(toggleLikeRecording(recordingId));
    }
  };

  return (
    <>
      <Box rounded='10' my='3' alignSelf='flex-start'>
        <ReactAudioPlayer src={fileUri} controls />
      </Box>
      <Box
        as='div'
        alignSelf='start'
        bg='black'
        color='white'
        rounded='xl'
        boxShadow='md'
      >
        <Flex px='3' py='2' direction='row'>
          <Box>
            <Text ml='3'>
              {recTitle}
              {recTags.split(',').map((tag, index) => (
                <Badge
                  rounded='lg'
                  bg='primaryColor'
                  color='whitesmoke'
                  ml='2'
                  textTransform='lowercase'
                >
                  #{tag}
                </Badge>
              ))}
            </Text>
          </Box>
          <Box ml='3' display='flex'>
            <Box display='flex'>
              {!recIsLiked ? (
                <IconButton
                  background='none'
                  rounded='xl'
                  onClick={() => {
                    toggleLikeHandler();
                  }}
                  _hover={{ background: 'secondaryColor' }}
                  aria-label='Like the recording'
                  icon={<AiOutlineHeart size={35} />}
                />
              ) : (
                <IconButton
                  background='none'
                  rounded='xl'
                  onClick={() => {
                    toggleLikeHandler();
                  }}
                  _hover={{ background: 'white' }}
                  aria-label='Like the recording'
                  icon={<AiFillHeart size={35} color='#d543bb' />}
                />
              )}

              <Badge
                bg='primaryColor'
                rounded='sm'
                color='white'
                maxHeight='5'
                mt='3'
              >
                {recIsLiked ? likes + 1 : likes}
              </Badge>
            </Box>
            <Box ml={3} display='flex'>
              <IconButton
                background='none'
                rounded='xl'
                onClick={() => {
                  if (!userInfoUserLogin || userInfoUserLogin.length === 0) {
                    toast({
                      title: 'Sorry!',
                      description:
                        'You have to be logged in order to see comments or comment in a recording',
                      isClosable: true,
                      status: 'error',
                      position: 'bottom-left',
                    });
                  } else {
                    onOpenComment();
                  }
                }}
                _hover={{ background: 'secondaryColor' }}
                aria-label='Comments'
                icon={<AiOutlineComment size={35} />}
              />
              <Badge
                bg='primaryColor'
                rounded='sm'
                color='white'
                maxHeight='5'
                mt='3'
              >
                {commentsArray.length}
              </Badge>
            </Box>
          </Box>
          {isMyRecording && (
            <Menu>
              <MenuButton ml='1' mt='-4'>
                <BsThreeDotsVertical size={25} color='gray' />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onOpen} color='black'>
                  <HStack>
                    <FaEdit size={20} color='#d543bb' />
                    <Text mt='3' fontSize='2'>
                      Edit
                    </Text>
                  </HStack>
                </MenuItem>
                <MenuItem onClick={() => setIsAlertOpen(true)}>
                  <HStack>
                    <FaTrash size={20} color='gray' />
                    <Text mt='3' color='black'>
                      Delete
                    </Text>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
        <Text
          color='grey'
          fontWeight='light'
          textAlign='center'
          fontStyle='italic'
          fontSize='sm'
          flexWrap='wrap'
          px='2'
        >
          {recDescription}
        </Text>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='primaryColor'>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tags</FormLabel>
              <Input
                value={recTags}
                onChange={(e) => setRecTags(e.target.value)}
              />
              <FormHelperText fontStyle='italic' fontWeight='light'>
                Make sure your tags are comma seprated
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={recDescription}
                onChange={(e) => setRecDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Accessibility</FormLabel>
              <Switch
                checked={recAccessibilityStatus}
                onChange={(e) =>
                  setRecAccessibilityStatus(!recAccessibilityStatus)
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='pink'
              mr={3}
              onClick={() => {
                dispatch(
                  editMyRecording({
                    recordingId,
                    title: recTitle,
                    tags: recTags,
                    description: recDescription,
                    isPublic: recAccessibilityStatus,
                  })
                );
              }}
              isLoading={loading}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ///////////////////////////Comment modal////////////////////////////////// */}

      <Modal
        initialFocusRef={commentInitialRef}
        isOpen={isOpenComment}
        onClose={onCloseComment}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='primaryColor'>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <InputGroup>
                <InputRightElement
                  children={
                    <Button
                      p='4'
                      variant='ghost'
                      minW='4'
                      isDisabled={commentValue.length === 0}
                      color='primaryColor'
                      onClick={() => {
                        dispatch(
                          comment(
                            commentValue,
                            loggedInuserAvatar ? loggedInuserAvatar : username,
                            username,
                            recordingId
                          )
                        );

                        ///new comment state handling and updating the new comment
                        setIsNewCommentAdded(true);

                        setcommentValue('');
                      }}
                    >
                      Post
                    </Button>
                  }
                />
                <Input
                  value={commentValue}
                  onChange={(e) => setcommentValue(e.target.value)}
                  placeholder='Add a comment ....'
                  focusBorderColor='primaryColor'
                />
              </InputGroup>
              <Divider m='3' />
              {commentsArray?.map((comment, index) => (
                <NextLink href={`/${comment.username}`}>
                  <HStack spacing='2' m='2'>
                    <Link>
                      <Avatar name={comment.username} src={comment.avatar} />
                    </Link>
                    <Link>
                      <Text color='black' fontWeight='bold'>
                        {comment.username}
                      </Text>
                    </Link>

                    {isEditCommentTriggered.index === index ? (
                      <Textarea
                        size='sm'
                        focusBorderColor='primaryColor'
                        value={editCommentText || comment.comment}
                        onChange={(e) => setEditCommentText(e.target.value)}
                      />
                    ) : (
                      <Text fontWeight='light' fontStyle='italic' fontSize='sm'>
                        {comment.comment}
                      </Text>
                    )}

                    {
                      <>
                        {isEditCommentTriggered.index === index ? (
                          <HStack>
                            <Button
                              aria-label='edit comment'
                              color='primaryColor'
                              background='black'
                              disabled={editCommentText.length <= 0}
                              onClick={() => {
                                dispatch(
                                  editComment({
                                    comment: editCommentText,
                                    commentId: comment._id,
                                    recordingId,
                                  })
                                );
                                //optimistic update
                                comment.comment = editCommentText;

                                //getting back to normal
                                setIsEditCommentTriggered({
                                  bool: false,
                                  index: null,
                                });

                                setEditCommentText('');
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              aria-label='Cancel'
                              onClick={() =>
                                setIsEditCommentTriggered({
                                  bool: false,
                                  index: null,
                                })
                              }
                            >
                              Cancel
                            </Button>
                          </HStack>
                        ) : (
                          <Menu>
                            <MenuButton>
                              <IconButton
                                aria-label='edit'
                                size='sm'
                                variant='outline'
                                icon={<BsThreeDotsVertical />}
                              />
                            </MenuButton>
                            <MenuList>
                              {comment.username === username ? (
                                <>
                                  <MenuItem>
                                    <HStack
                                      onClick={() => {
                                        setIsEditCommentTriggered({
                                          bool: true,
                                          index,
                                        });
                                      }}
                                    >
                                      <FaEdit size={15} />
                                      <Text mt='3' fontSize='xs'>
                                        Edit
                                      </Text>
                                    </HStack>
                                  </MenuItem>
                                </>
                              ) : (
                                ''
                              )}
                              {/* Available for both the owner of recorder and the
                              author of comment */}
                              {isMyRecording ||
                              comment.username === username ? (
                                <MenuItem>
                                  <HStack
                                    onClick={() => {
                                      dispatch(
                                        deleteComment({
                                          commentId: comment._id,
                                          recordingId,
                                        })
                                      );
                                    }}
                                  >
                                    <FaTrash size={15} />
                                    <Text mt='3' fontSize='xs'>
                                      Delete
                                    </Text>
                                  </HStack>
                                </MenuItem>
                              ) : (
                                ''
                              )}
                            </MenuList>
                          </Menu>
                        )}
                      </>
                    }
                  </HStack>
                </NextLink>
              ))}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onCloseComment}
              background='secondaryColor'
              color='white'
              _hover={{ color: 'black', background: 'white' }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Recording
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  dispatch(deleteMyRecording(recordingId));

                  dispatch(getMyRecordings());
                }}
                ml={3}
                isLoading={loadingDelete}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Divider />
    </>
  );
};
