import Box from '@mui/material/Box';
import logo from '../../assets/moto_logo.png';
import { InputField } from '../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import Phone from '@mui/icons-material/Phone';
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "../../components/Button/Button";
import {LOGIN} from "../../graphql/mutition/login/login"
import { setAuth } from '../../features/auth/setAuth';
import { useMutation } from '@apollo/client/react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
export const LoginPage = () => {
  const dispatch=useDispatch();
  const [user, setUser] = useState({
    phone: '',
    password: ''
  });
  const [loginUser, { data, loading }] =
  useMutation<LoginResponse>(LOGIN);
  const {accessToken}=useSelector((state:RootState)=>state.auth);
  type LoginResponse = {
  login: {
    accessToken: string;
    user: {
      id: number;
      name: string;
      phone: string;
    };
  };
};
 const handleLogin = async () => {
  try {
    const res = await loginUser({
      variables: {
        input: {
          phone: user.phone,
          password: user.password,
        },
      },
    });

    if (res.data?.login) {
      dispatch(setAuth(res.data.login));
    }

  } catch (err) {
    console.log(err);
  }
};
 
  return (
    <div className='flex min-h-screen'>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
        }}
      >

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:' (--bg-color)',

            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            boxShadow: `
  -10px 10px 30px rgba(1,1,1,0.05),
  -5px 5px 20px rgba(139, 0, 0, 0.15),
  -2px 2px 10px rgba(139, 0, 0, 0.2)
`,
            position: 'relative',
            zIndex: 1,

            p: 4,
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              
              maxWidth: '400px',
              width: '100%',
              height: '100%'
            }}
          />
        </Box>


        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:' (--bg-color)',
            p: 4,
            gap: 3
          }}
        >
          <div className="w-full max-w-sm flex flex-col items-center gap-6">
            <h1 className='text-center text-gray-900 text-2xl'>تسجيل الدخول</h1>
            <InputField
              label='رقم الهاتف'
              value={user.phone}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setUser({ ...user, phone: onlyNumbers });
              }}
              icon={<Phone />}
              type="number"
            />

            <InputField
              label='كلمة المرور'
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              icon={<LockIcon />}
              type='password'
            />
            <Button text={loading?"...جاري تسجيل الدخول ":"تسجيل الدخول"} onClick={handleLogin } />

          </div>
        </Box>

      </Box>
    </div>
  );
};