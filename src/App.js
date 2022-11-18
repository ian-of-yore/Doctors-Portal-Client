import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className='max-w-[1440px] mx-auto'>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
