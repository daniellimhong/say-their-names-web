import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PersonPreview from '../profilePreview/ProfilePreview';
import StyledProfileList from './styles';
import Spinner from '../../common/Spinner';
import config from '../../../utils/config';
import Container from '../../common/Container';

const { apiBaseUrl } = config;

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]); // this will hold the profles list fetched from the API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/people`);
        setProfiles(response.data.data);
      } catch (error) {
        // toast(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);
  return (
    <Container>
      {loading && <Spinner height="40vh" />}
      {profiles.length === 0 && !loading && <h2>No profile found</h2>}
      <StyledProfileList>
        {profiles.length > 0
          && profiles.map((profile) => (
            <PersonPreview
              key={profile.id}
              id={profile.id}
              image={profile.images[0]}
              fullName={profile.full_name}
              dateOfIncident={profile.date_of_incident}
            />
          ))}
      </StyledProfileList>
    </Container>
  );
};
export default ProfileList;
