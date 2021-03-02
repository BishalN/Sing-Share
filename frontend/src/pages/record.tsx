import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import { RecordAndUploadFileTab } from '../components/RecordAndUploadFileTab';
import { UploadRecordedFileTab } from '../components/UploadRecordedFileTab';

interface recordProps {}

const Record: React.FC<recordProps> = ({}) => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  const router = useRouter();
  useEffect(() => {
    if (userInfo?.length === 0) {
      router.push('/login');
    }
  }, [userInfo]);
  return (
    <Layout>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minH='80vh'
      >
        <Tabs isFitted variant='soft-rounded' mt={4}>
          <TabList mb='1em'>
            <Tab fontWeight='bold' fontSize='xl'>
              Upload an audio File
            </Tab>
            <Tab fontWeight='bold' fontSize='xl'>
              Record and Upload
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UploadRecordedFileTab />
            </TabPanel>
            <TabPanel>
              <RecordAndUploadFileTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Layout>
  );
};

export default Record;
