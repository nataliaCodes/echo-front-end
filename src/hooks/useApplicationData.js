import {
  useState,
  useEffect
} from 'react';

//use cookies hook
import { useCookies } from "react-cookie";

import axios from 'axios';

import youtubeApi from '../api/youtube';

const useApplicationData = () => {

  //initial state
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
    redirect: null,
    users: null,
    videos: null,
    categories: null,
    videoMetaInfo: [],
    selectedVideoID: null,
    startTime: 0,
    endTime: null,
    videoDuration: null,
    oldVideo: false,
    catRedirect: null,
    new: null
  });

  //set initial cookie
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  //extracts all users from the DB + connected videos and categories
  useEffect(() => {

    //stops the axios calls from happening when user is not logged in
    if (!cookies.user) {
      return;
    }

    //promise.all to call all data we need at the same time
    Promise.all([
      axios.get('api/users'),
      axios.get('api/videos'),
      axios.get('api/categories'),
    ])
    .then(all => {
      //'all' comes back as an array of responses from the axios calls
      const categNames = all[2].data.map(item => item.name);
      
      //set current state with axios calls data
      setState(prev => ({...prev, users: all[0].data, videos: all[1].data.response, categories: categNames, categWithId: all[2].data}))
      
    })
    .catch((err) => console.log(err));

  }, [cookies.user])   //<-- only renders when user is present

  //handles input from log in and register forms dynamically
  const handleFormChange = event => {

    const input = event.target.value;
    const fieldName = event.target.name;

    setState({
      ...state,
      [fieldName]: input
    });

  };

  const handleRegisterSubmit = e => {
    e.preventDefault();
    
    //deconstruct values needed from state
    const { firstName, lastName, email, password } = state;
    let validForm = true;
    
    //if any of the inputs are empty, set error state
    if (!firstName || !lastName || !email || !password) {

      validForm = false;
      setState({...state, error: 'Fields cannot be empty!'});

    }

    if (validForm) {
      //reset error state
      setState({...state, error: ''});

      //build input object to send to back-end
      const userInput = {
        firstName,
        lastName,
        email,
        password
      };

      //send data to back-end
      return axios.post('/register', { userInput })
        .then(response => {

            //if server sends response.msg, user exists in DB
            const userExists = response.data.msg

            //if user exists set state error
            if (userExists) {
              setState({...state, error: userExists});

            } else {
              console.log(' response.data.id:', response.data.id);
              setCookie("user", response.data.id, {
                path: "/"
              });
              setState({...state, redirect: '/'});
            }
        })
        .catch(err => {console.log(err)})
    }
  }

  const handleLoginSubmit = e => {
    e.preventDefault();

    //deconstruct values needed from state
    const { email, password } = state;
    let validForm = true;
    
    //if any of the inputs are empty, set error state
    if (!email || !password) {

      validForm = false;
      setState({...state, error: 'Fields cannot be empty!'});

    }

    if (validForm) {

      console.log('true valid form :');
      //reset error state
      setState({...state, error: ''});

      //build input object to send to back-end
      const loginInput = {
        email,
        password
      };
      console.log('loginInput :', loginInput);

      //send data to back-end
      return axios.post('/login', { loginInput })
        .then(response => {
          console.log('response :', response);

            //if server sends response.msg, user exists in DB
            const noUser = response.data.msg

            //if user exists set state error
            if (noUser) {
              setState({...state, error: noUser});

            } else {
              console.log(' response.data.id:', response.data.id);
              setCookie("user", response.data.id, {
                path: "/"
              });
              setState({...state, redirect: '/'});
            }
        })
        .catch(err => {console.log('error:', err)})
    }
  }

  const handleLogout = () => {
    //reset cookie when user logs out
    removeCookie("user", { path: "/"});
  }

  const onVideoSelected = videoId => {
    setState((prev)=>({ ...prev, selectedVideoID:videoId, oldVideo: false }))
  }

  const onSearch = async keyword => {
    const response = await youtubeApi.get("/search",{
      params:{
        q:keyword
      }
    })

    setState({
      ...state,
      videoMetaInfo: response.data.items
    })
  }

  const setSelectedVideoID = (videoID) =>{
    setState((prev)=>({...prev, selectedVideoID: videoID}));
  };
  
  return { state, cookies, handleFormChange, handleRegisterSubmit, handleLoginSubmit, onVideoSelected, onSearch, handleLogout, setState, setSelectedVideoID }

};

export default useApplicationData;