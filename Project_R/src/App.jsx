import { useState } from 'react';
import {useDispatch} from 'react-redux';
import './App.css'

function App() {
  const [loading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  return (
    <div>
    A blog app with appwrite
    </div>
  )
}

export default App
