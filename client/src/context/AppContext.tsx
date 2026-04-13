import { createContext,  useContext, useEffect, useState } from "react";
import { initialState, type ActivityEntry, type Credentials, type FoodEntry, type User } from "../types";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../assets/apiClient";


const AppContext = createContext(initialState)

export const AppProvider = ({children} : {children: React.ReactNode})=>{
    
    const navigate = useNavigate()
    const [user, setUser] = useState<User>(null)
    const [isUserFetched, setIsUserFetched] = useState(false)
    const [onboardingCompleted, setOnboardingCompleted] = useState(false)
    const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([])
    const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([])

    const signup = async (credentials: Credentials)=>{
        const registerData = {
            username: credentials.username || credentials.email.split('@')[0],
            email: credentials.email,
            password: credentials.password
        };
        const response = await apiClient.auth.register(registerData)
        const newUser = { ...(response.user as Exclude<User, null>), token: response.jwt } as Exclude<User, null>;
        setUser(newUser)
        if(newUser.age && newUser.weight && newUser.goal){
            setOnboardingCompleted(true)
        }
        localStorage.setItem('token', response.jwt)
    }

    const login = async (credentials: Credentials)=>{
        const loginData = {
            identifier: credentials.email,
            password: credentials.password
        };
        const response = await apiClient.auth.login(loginData)
        const loggedInUser = { ...(response.user as Exclude<User, null>), token: response.jwt } as Exclude<User, null>;
        setUser(loggedInUser)
        if(loggedInUser.age && loggedInUser.weight && loggedInUser.goal){
            setOnboardingCompleted(true)
        }
        localStorage.setItem('token', response.jwt)
    }

    const fetchUser = async (token: string)=>{
        const response = await apiClient.user.me()
        const currentUser = { ...(response as Exclude<User, null>), token } as Exclude<User, null>;
        setUser(currentUser)
        if(currentUser.age && currentUser.weight && currentUser.goal){
            setOnboardingCompleted(true)
        }
        setIsUserFetched(true)
    }

    const fetchFoodLogs = async ()=>{
        const response = await apiClient.foodLogs.list()
        setAllFoodLogs(response.data)
    }

    const fetchActivityLogs = async ()=>{
        const response = await apiClient.activityLogs.list()
        setAllActivityLogs(response.data)
    }

    const logout = ()=>{
      localStorage.removeItem('token')
      setUser(null)
      setOnboardingCompleted(false)
     navigate('/')  
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            (async ()=>{
                await fetchUser(token)
                await fetchFoodLogs()
                await fetchActivityLogs()
            })();
        }else{
            setIsUserFetched(true)
        }
    },[])

    
    const value = {
        user, setUser, isUserFetched, fetchUser, 
        signup, login, logout, onboardingCompleted, setOnboardingCompleted,
        allFoodLogs, setAllFoodLogs, allActivityLogs, setAllActivityLogs
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)