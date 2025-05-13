// import React from 'react';
// import { Flex, Heading, Button } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext.jsx';

// function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <Flex as="nav" p={4} bg="brand.500" color="white" justify="space-between" align="center">
//       <Heading size="md" onClick={() => navigate('/')} cursor="pointer">
//         Adsense
//       </Heading>
//       <Flex gap={4}>
//         {user ? (
//           <>
//             <Button colorScheme="whiteAlpha" onClick={() => logout()}>
//               Logout
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button colorScheme="whiteAlpha" onClick={() => navigate('/login')}>
//               Login
//             </Button>
//             <Button colorScheme="whiteAlpha" onClick={() => navigate('/signup')}>
//               Signup
//             </Button>
//           </>
//         )}
//       </Flex>
//     </Flex>
//   );
// }

// export default Navbar;
import React from 'react';
import { Flex, Heading, Image, Button } from '@chakra-ui/react';
import logo from '../assets/logo.png';

const Navbar = () => (
  <Flex
    bgGradient="linear(to-r, red.400, orange.400)"
    p={4}
    color="white"
    alignItems="center"
    justifyContent="space-between"
  >
    <Flex alignItems="center">
      <Image
        src={logo}
        boxSize="40px"
        borderRadius="md"
        mr={2}
      />
      <Heading size="md" color="white">
        🔺SENSE
      </Heading>
    </Flex>
    <Flex>
    <Button 
    variant="ghost" 
    color="white" 
    mr={3}
   _hover={{ bg: 'blue.500', color: 'white' }}
   >
     Home 
      </Button> 
      <Button variant="ghost" color="white" mr={3}_hover={{ bg: 'blue.500', color: 'white' }}
>
        About
      </Button>
      <Button variant="ghost" color="white" mr={3} _hover={{ bg: 'blue.500', color: 'white' }}>
        Contact
      </Button>
    </Flex>
  </Flex>
);

export default Navbar;
