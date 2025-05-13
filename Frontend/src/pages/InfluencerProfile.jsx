// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Flex,
//   VStack,
//   Heading,
//   Text,
//   IconButton,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   Avatar,
//   Button,
//   Select,
//   HStack,
//   Icon,
//   Spinner,
// } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
// import { FiEdit, FiSave, FiTrash2 } from 'react-icons/fi';
// import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';
// import { useAuth } from '../contexts/AuthContext.jsx';
// import axios from 'axios';

// const categoriesList = ['Fashion', 'Fitness', 'Travel', 'Tech', 'Food'];
// const platformIcons = {
//   Instagram: <FaInstagram />,
//   YouTube: <FaYoutube />,
//   TikTok: <FaTiktok />,
// };

// const InfluencerProfile = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [influencerProfile, setInfluencerProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedProfile, setEditedProfile] = useState(null);
//   const [error, setError] = useState('');
//   const [newPlatform, setNewPlatform] = useState({ platform: '', followers: '' });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!user) return;

//       try {
//         const res = await axios.get('http://localhost:5001/api/users/profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setInfluencerProfile(res.data);
//         setEditedProfile(res.data);
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//         setError('Failed to load profile data');
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   const handleEditToggle = async () => {
//     if (isEditing) {
//       try {
//         const res = await axios.put('http://localhost:5001/api/users/profile', editedProfile, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setInfluencerProfile(res.data);
//         setEditedProfile(res.data);
//       } catch (err) {
//         console.error('Error updating profile:', err);
//         setError('Failed to update profile');
//       }
//     }
//     setIsEditing(!isEditing);
//   };

//   const handleProfileChange = (field, value) => {
//     setEditedProfile((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSocialMediaChange = (index, field, value) => {
//     const updatedSocialMedia = [...editedProfile.socialMedia];
//     updatedSocialMedia[index] = { ...updatedSocialMedia[index], [field]: value };
//     setEditedProfile((prev) => ({ ...prev, socialMedia: updatedSocialMedia }));
//   };

//   const handleAddPlatform = () => {
//     if (!newPlatform.platform || !newPlatform.followers) return;
//     setEditedProfile((prev) => ({
//       ...prev,
//       socialMedia: [
//         ...prev.socialMedia,
//         { platform: newPlatform.platform, followers: parseInt(newPlatform.followers) },
//       ],
//     }));
//     setNewPlatform({ platform: '', followers: '' });
//   };

//   const handleRemovePlatform = (index) => {
//     const updatedSocialMedia = editedProfile.socialMedia.filter((_, i) => i !== index);
//     setEditedProfile((prev) => ({ ...prev, socialMedia: updatedSocialMedia }));
//   };

//   const handleCategoryChange = (e) => {
//     const options = e.target.options;
//     const selected = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selected.push(options[i].value);
//       }
//     }
//     handleProfileChange('categories', selected);
//   };

//   const handleBackToDashboard = () => {
//     navigate('/influencer/dashboard');
//   };

//   if (!influencerProfile) {
//     return (
//       <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
//         <Spinner size="xl" color="brand.500" />
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <Box minH="calc(100vh - 160px)" p={6} bg="gray.50">
//         <Flex justify="space-between" align="center" mb={4}>
//           <Flex align="center">
//             <Avatar
//               name={influencerProfile.name}
//               size="lg"
//               bg="brand.500"
//               color="white"
//               mr={4}
//             />
//             <Heading size="lg" color="brand.500">{influencerProfile.name}</Heading>
//           </Flex>
//           <IconButton
//             icon={isEditing ? <FiSave /> : <FiEdit />}
//             onClick={handleEditToggle}
//             colorScheme={isEditing ? 'green' : 'brand'}
//             aria-label={isEditing ? 'Save Profile' : 'Edit Profile'}
//           />
//         </Flex>
//         {error && (
//           <Text color="red.500" mb={4}>
//             {error}
//           </Text>
//         )}
//         <Box p={6} bg="white" borderRadius="md" boxShadow="md">
//           <VStack spacing={4} align="stretch">
//             <FormControl>
//               <FormLabel>Name</FormLabel>
//               {isEditing ? (
//                 <Input
//                   value={editedProfile.name}
//                   onChange={(e) => handleProfileChange('name', e.target.value)}
//                   focusBorderColor="brand.500"
//                 />
//               ) : (
//                 <Text>{influencerProfile.name}</Text>
//               )}
//             </FormControl>
//             <FormControl>
//               <FormLabel>Email</FormLabel>
//               <Text>{influencerProfile.email}</Text>
//             </FormControl>
//             <FormControl>
//               <FormLabel>Role</FormLabel>
//               <Text>{influencerProfile.role.charAt(0).toUpperCase() + influencerProfile.role.slice(1)}</Text>
//             </FormControl>
//             <FormControl>
//               <FormLabel>Contact Information (Phone)</FormLabel>
//               {isEditing ? (
//                 <Input
//                   value={editedProfile.contactInfo}
//                   onChange={(e) => handleProfileChange('contactInfo', e.target.value)}
//                   type="tel"
//                   focusBorderColor="brand.500"
//                 />
//               ) : (
//                 <Text>{influencerProfile.contactInfo}</Text>
//               )}
//             </FormControl>
//             <FormControl>
//               <FormLabel>Social Media Platforms</FormLabel>
//               {isEditing ? (
//                 <>
//                   {editedProfile.socialMedia.map((sm, index) => (
//                     <HStack key={index} spacing={2} mb={2}>
//                       <Input
//                         value={sm.platform}
//                         onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
//                         placeholder="Platform"
//                         focusBorderColor="brand.500"
//                       />
//                       <Input
//                         value={sm.followers}
//                         onChange={(e) => handleSocialMediaChange(index, 'followers', parseInt(e.target.value))}
//                         type="number"
//                         placeholder="Followers"
//                         focusBorderColor="brand.500"
//                       />
//                       <IconButton
//                         icon={<FiTrash2 />}
//                         colorScheme="red"
//                         onClick={() => handleRemovePlatform(index)}
//                         aria-label="Remove Platform"
//                       />
//                     </HStack>
//                   ))}
//                   <HStack spacing={2}>
//                     <Select
//                       value={newPlatform.platform}
//                       onChange={(e) => setNewPlatform((prev) => ({ ...prev, platform: e.target.value }))}
//                       placeholder="Select Platform"
//                       focusBorderColor="brand.500"
//                     >
//                       <option value="Instagram">Instagram</option>
//                       <option value="YouTube">YouTube</option>
//                       <option value="TikTok">TikTok</option>
//                     </Select>
//                     <Input
//                       value={newPlatform.followers}
//                       onChange={(e) => setNewPlatform((prev) => ({ ...prev, followers: e.target.value }))}
//                       type="number"
//                       placeholder="Followers"
//                       focusBorderColor="brand.500"
//                     />
//                     <Button onClick={handleAddPlatform} colorScheme="brand">
//                       Add
//                     </Button>
//                   </HStack>
//                 </>
//               ) : (
//                 <VStack align="start">
//                   {influencerProfile.socialMedia.length > 0 ? (
//                     influencerProfile.socialMedia.map((sm, index) => (
//                       <Flex key={index} align="center">
//                         {platformIcons[sm.platform] && <Icon as={() => platformIcons[sm.platform]} mr={2} />}
//                         <Text>
//                           {sm.platform}: {sm.followers.toLocaleString()} followers
//                         </Text>
//                       </Flex>
//                     ))
//                   ) : (
//                     <Text>None</Text>
//                   )}
//                 </VStack>
//               )}
//             </FormControl>
//             <FormControl>
//               <FormLabel>Total Followers</FormLabel>
//               <Text>
//                 {(influencerProfile.socialMedia || []).reduce((sum, sm) => sum + (sm.followers || 0), 0).toLocaleString()}
//               </Text>
//             </FormControl>
//             <FormControl>
//               <FormLabel>Categories</FormLabel>
//               {isEditing ? (
//                 <Select
//                   multiple
//                   value={editedProfile.categories || []}
//                   onChange={handleCategoryChange}
//                   focusBorderColor="brand.500"
//                   height="100px"
//                 >
//                   {categoriesList.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </Select>
//               ) : (
//                 <Text>{influencerProfile.categories?.join(', ') || 'None'}</Text>
//               )}
//             </FormControl>
//             <FormControl>
//               <FormLabel>Description</FormLabel>
//               {isEditing ? (
//                 <Textarea
//                   value={editedProfile.description}
//                   onChange={(e) => handleProfileChange('description', e.target.value)}
//                   focusBorderColor="brand.500"
//                   rows={3}
//                 />
//               ) : (
//                 <Text>{influencerProfile.description}</Text>
//               )}
//             </FormControl>
//           </VStack>
//         </Box>
//         <Button mt={6} colorScheme="brand" onClick={handleBackToDashboard}>
//           Back to Dashboard
//         </Button>
//       </Box>
//       <Footer />
//     </>
//   );
// };

// export default InfluencerProfile;




import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Avatar,
  Button,
  Select,
  HStack,
  Icon,
  Spinner,
  SimpleGrid,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiSave, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import Navbar from '../components/Navbar.jsx'; // Assuming these exist
import Footer from '../components/Footer.jsx'; // Assuming these exist
import { useAuth } from '../contexts/AuthContext.jsx'; // Assuming this exists
import axios from 'axios';

const categoriesList = ['Fashion', 'Fitness', 'Travel', 'Tech', 'Food'];
const platformIcons = {
  Instagram: <FaInstagram color="#E1306C" />,
  YouTube: <FaYoutube color="#FF0000" />,
  TikTok: <FaTiktok color="#000000" />,
};

// Sample ad data (replace with actual ad data from your backend or API)
const sampleAds = [
  {
    id: 1,
    title: 'Promote Your Brand',
    description: 'Reach millions with our influencer network!',
    image: 'https://source.unsplash.com/random/300x200/?fashion',
    cta: 'Learn More',
  },
  {
    id: 2,
    title: 'Grow Your Audience',
    description: 'Engage with top influencers today.',
    image: 'https://source.unsplash.com/random/300x200/?beauty',
    cta: 'Get Started',
  },
];

const InfluencerProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [influencerProfile, setInfluencerProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [error, setError] = useState('');
  const [newPlatform, setNewPlatform] = useState({ platform: '', followers: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5001/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setInfluencerProfile(res.data);
        setEditedProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleEditToggle = async () => {
    if (isEditing) {
      setLoading(true);
      try {
        const res = await axios.put('http://localhost:5001/api/users/profile', editedProfile, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setInfluencerProfile(res.data);
        setEditedProfile(res.data);
      } catch (err) {
        console.error('Error updating profile:', err);
        setError('Failed to update profile');
      } finally {
        setLoading(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (field, value) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updatedSocialMedia = [...editedProfile.socialMedia];
    updatedSocialMedia[index] = { ...updatedSocialMedia[index], [field]: value };
    setEditedProfile((prev) => ({ ...prev, socialMedia: updatedSocialMedia }));
  };

  const handleAddPlatform = () => {
    if (!newPlatform.platform || !newPlatform.followers) {
      setError('Please select a platform and enter follower count');
      return;
    }
    setEditedProfile((prev) => ({
      ...prev,
      socialMedia: [
        ...prev.socialMedia,
        { platform: newPlatform.platform, followers: parseInt(newPlatform.followers, 10) },
      ],
    }));
    setNewPlatform({ platform: '', followers: '' });
    setError('');
  };

  const handleRemovePlatform = (index) => {
    const updatedSocialMedia = editedProfile.socialMedia.filter((_, i) => i !== index);
    setEditedProfile((prev) => ({ ...prev, socialMedia: updatedSocialMedia }));
  };

  const handleCategoryChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    handleProfileChange('categories', selected);
  };

  const handleBackToDashboard = () => {
    navigate('/influencer/dashboard');
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, gray.50, gray.100)">
        <Spinner size="xl" color="orange.500" />
      </Box>
    );
  }

  if (!influencerProfile) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, gray.50, gray.100)">
        <Text fontSize="xl" color="gray.600">
          Profile not found.
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box minH="calc(100vh - 160px)" p={6} bgGradient="linear(to-br, gray.50, gray.100)">
        <Button
          onClick={handleBackToDashboard}
          variant="ghost"
          colorScheme="orange"
          mb={4}
          _hover={{ bg: 'orange.100' }}
        >
          <FiArrowLeft mr={2} />
          Back to Dashboard
        </Button>
        <Flex justify="space-between" align="center" mb={8}>
          <Flex align="center">
            <Avatar
              name={influencerProfile.name}
              size="2xl"
              bg="orange.500"
              color="white"
              mr={6}
              boxShadow="lg"
            />
            <Heading
              size="3xl"
              fontWeight="bold"
              color="orange.700"
              textShadow="1px 1px 2px rgba(0, 0, 0, 0.1)"
            >
              {influencerProfile.name}
            </Heading>
          </Flex>
          <IconButton
            icon={isEditing ? <FiSave size={24} /> : <FiEdit size={24} />}
            onClick={handleEditToggle}
            colorScheme="orange"
            variant="outline"
            boxShadow="md"
            _hover={{
              bg: isEditing ? 'green.100' : 'orange.100',
              color: isEditing ? 'green.600' : 'orange.600',
              transform: 'scale(1.05)',
            }}
            transition="all 0.2s"
            size="lg"
            aria-label={isEditing ? 'Save Profile' : 'Edit Profile'}
          />
        </Flex>
        {error && (
          <Text color="red.500" mb={4} fontWeight="semibold">
            {error}
          </Text>
        )}
        <Card bg="white" boxShadow="xl" borderRadius="lg">
          <CardHeader>
            <Heading size="2xl" color="gray.800" fontWeight="semibold">
              Profile Information
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="lg" color="gray.700">
                  Name
                </FormLabel>
                {isEditing ? (
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    focusBorderColor="orange.500"
                    bg="gray.50"
                    placeholder="Enter your name"
                    _placeholder={{ color: 'gray.400' }}
                  />
                ) : (
                  <Text fontSize="lg" color="gray.600">
                    {influencerProfile.name}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="lg" color="gray.700">
                  Email
                </FormLabel>
                <Text fontSize="lg" color="gray.600">
                  {influencerProfile.email}
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="lg" color="gray.700">
                  Role
                </FormLabel>
                <Text fontSize="lg" color="gray.600">
                  {influencerProfile.role.charAt(0).toUpperCase() +
                    influencerProfile.role.slice(1)}
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="lg" color="gray.700">
                  Contact Information (Phone)
                </FormLabel>
                {isEditing ? (
                  <Input
                    value={editedProfile.contactInfo}
                    onChange={(e) => handleProfileChange('contactInfo', e.target.value)}
                    type="tel"
                    focusBorderColor="orange.500"
                    bg="gray.50"
                    placeholder="Enter your phone number"
                    _placeholder={{ color: 'gray.400' }}
                  />
                ) : (
                  <Text fontSize="lg" color="gray.600">
                    {influencerProfile.contactInfo}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="lg" color="gray.700">
                  Social Media Platforms
                </FormLabel>
                {isEditing ? (
                  <>
                    {editedProfile.socialMedia.map((sm, index) => (
                      <HStack key={index} spacing={4} mb={4} align="center">
                        <Input
                          value={sm.platform}
                          onChange={(e) =>
                            handleSocialMediaChange(index, 'platform', e.target.value)
                          }
                          placeholder="Platform"
                          focusBorderColor="orange.500"
                          bg="gray.50"
                          _placeholder={{ color: 'gray.400' }}
                        />
                        <Input
                          value={sm.followers}
                          onChange={(e) =>
                            handleSocialMediaChange(
                              index,
                              'followers',
                              parseInt(e.target.value, 10),
                            )
                          }
                          type="number"
                          placeholder="Followers"
                          focusBorderColor="orange.500"
                          bg="gray.50"
                          _placeholder={{ color: 'gray.400' }}
                        />
                        <IconButton
                          icon={<FiTrash2 size={20} />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleRemovePlatform(index)}
                          aria-label="Remove Platform"
                          _hover={{ bg: 'red.100', color: 'red.600' }}
                        />
                      </HStack>
                    ))}
                    <HStack spacing={4}>
                      <Select
                        value={newPlatform.platform}
                        onChange={(e) =>
                          setNewPlatform((prev) => ({
                            ...prev,
                            platform: e.target.value,
                          }))
                        }
                        placeholder="Select Platform"
                        focusBorderColor="orange.500"
                        bg="gray.50"
                      >
                        <option value="Instagram">Instagram</option>
                        <option value="YouTube">YouTube</option>
                        <option value="TikTok">TikTok</option>
                      </Select>
                      <Input
                        value={newPlatform.followers}
                        onChange={(e) =>
                          setNewPlatform((prev) => ({
                            ...prev,
                            followers: e.target.value,
                          }))
                        }
                        type="number"
                        placeholder="Followers"
                        focusBorderColor="orange.500"
                        bg="gray.50"
                        _placeholder={{ color: 'gray.400' }}
                      />
                      <Button onClick={handleAddPlatform} colorScheme="orange">
                        Add
                      </Button>
                    </HStack>
                  </>
                ) : (
                  <VStack align="start">
                    {influencerProfile.socialMedia.length > 0 ? (
                      influencerProfile.socialMedia.map((sm, index) => (
                        <Flex key={index} align="center" fontSize="lg" color="gray.600">
                          {platformIcons[sm.platform] && (
                            <Icon as={() => platformIcons[sm.platform]} mr={2} size={20} />
                          )}
                          <Text fontWeight="medium">
                            {sm.platform}:
                          </Text>
                          <Text ml={1}>
                            {sm.followers.toLocaleString()} followers
                          </Text>
                        </Flex>
                      ))
                    ) : (
                      <Text fontSize="lg" color="gray.500">
                        None
                      </Text>
                    )}
                  </VStack>
                )}
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="lg" color="gray.700">
                  Total Followers
                </FormLabel>
                <Text fontSize="xl" color="orange.600" fontWeight="bold">
                  {(influencerProfile.socialMedia || []).reduce(
                    (sum, sm) => sum + (sm.followers || 0),
                    0,
                  ).toLocaleString()}
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="lg" color="gray.700">
                  Categories
                </FormLabel>
                {isEditing ? (
                  <Select
                    multiple
                    value={editedProfile.categories || []}
                    onChange={handleCategoryChange}
                    focusBorderColor="orange.500"
                    bg="gray.50"
                    height="120px"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <HStack spacing={2} flexWrap="wrap">
                    {influencerProfile.categories?.map((cat) => (
                      <Box
                        key={cat}
                        px={3}
                        py={1}
                        borderRadius="full"
                        bg="orange.100"
                        color="orange.700"
                        fontWeight="medium"
                        fontSize="sm"
                      >
                        {cat}
                      </Box>
                    )) || (
                      <Text fontSize="lg" color="gray.500">
                        None
                      </Text>
                    )}
                  </HStack>
                )}
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="lg" color="gray.700">
                  Description
                </FormLabel>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.description}
                    onChange={(e) =>
                      handleProfileChange('description', e.target.value)
                    }
                    focusBorderColor="orange.500"
                    bg="gray.50"
                    rows={4}
                    placeholder="Enter your description"
                    _placeholder={{ color: 'gray.400' }}
                  />
                ) : (
                  <Text fontSize="lg" color="gray.600" lineHeight="1.7">
                    {influencerProfile.description || (
                      <Text fontStyle="italic" color="gray.500">
                        No description available.
                      </Text>
                    )}
                  </Text>
                )}
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {/* New Ad Section */}
        <Box mt={10}>
          <Heading
            size="2xl"
            mb={8}
            color="orange.700"
            fontWeight="bold"
            textShadow="1px 1px 2px rgba(0, 0, 0, 0.1)"
          >
            Sponsored Opportunities
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {sampleAds.map((ad) => (
              <Card
                key={ad.id}
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-10px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                }}
                overflow="hidden"
              >
                <CardHeader p={0}>
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    objectFit="cover"
                    h="250px"
                    w="100%"
                  />
                </CardHeader>
                <CardBody p={6}>
                  <Heading
                    size="xl"
                    mb={3}
                    color="orange.600"
                    fontWeight="semibold"
                    letterSpacing="-0.5px"
                  >
                    {ad.title}
                  </Heading>
                  <Text
                    fontSize="lg"
                    color="gray.700"
                    lineHeight="1.7"
                    mb={4}
                  >
                    {ad.description}
                  </Text>
                </CardBody>
                <CardFooter p={6}>
                  <Button
                    size="lg"
                    colorScheme="orange"
                    width="100%"
                    _hover={{ bg: 'orange.600' }}
                    fontWeight="semibold"
                  >
                    {ad.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default InfluencerProfile;




