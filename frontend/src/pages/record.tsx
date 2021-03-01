import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';
import { RecordAndUploadFileTab } from '../components/RecordAndUploadFileTab';
import { UploadRecordedFileTab } from '../components/UploadRecordedFileTab';

interface recordProps {}

const Record: React.FC<recordProps> = ({}) => {
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
