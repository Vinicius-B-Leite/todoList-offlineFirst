import { synchronize } from '@nozbe/watermelondb/sync';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import Home from './src/components/home';
import TaskProvider from './src/context';
import { database } from './src/db'
// import { Container } from './styles';


const client = new QueryClient()
const App: React.FC = () => {



  
  return (
    <QueryClientProvider client={client}>
      <TaskProvider>
        <Home />
      </TaskProvider>
    </QueryClientProvider>
  )
}

export default App;