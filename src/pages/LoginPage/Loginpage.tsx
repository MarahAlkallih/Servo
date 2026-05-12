import Box from '@mui/material/Box';
import logo from '../../assets/moto_logo.png';
import { InputField } from '../../components/InputField/InputField';
import { useState } from 'react';
import Phone from '@mui/icons-material/Phone';
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "../../components/Button/Button";
export const LoginPage = () => {
  const [user, setUser] = useState({
    phone: '',
    password: ''
  });

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
            backgroundColor: 'grey.100',

            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            boxShadow: `
  -10px 10px 30px rgba(0,0,0,0.05),
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
              maxWidth: '300px',
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
            backgroundColor: '#fff',
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
            <Button text="تسجيل الدخول" onClick={() => { console.log("user"); }} />

          </div>
        </Box>

      </Box>
    </div>
  );
};