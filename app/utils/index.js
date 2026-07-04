import { supabase } from '../supabase';
import { v4 as uuidv4 } from "uuid";

const handleUpload = async (
  file,
  onSuccess,
  onError,
  onProgress,
  setFileList,
  downloadLinkHook
) => {
  if (!file) return;

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `profile-image-uploads/${fileName}`;

  try {
    onProgress({ percent: 0 });

    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);

    console.log("File available at", publicUrl);
    downloadLinkHook(publicUrl);
    onSuccess("Ok");
    setFileList((prevFileList) =>
      prevFileList.map((item) => ({
        ...item,
        status: "done",
        url: publicUrl,
        thumbUrl: publicUrl,
      }))
    );
    onProgress({ percent: 100 });

  } catch (error) {
    console.error('Error uploading file:', error.message);
    onError(error);
  }
};

const registerTeam = async (teamData) => {

  try {

    console.log(teamData)

    // Pre Process stage
    let preProcess = teamData;

    Object.keys(preProcess).forEach(step => {
      if (preProcess[step].hasOwnProperty('img')) {
        delete preProcess[step].img;
      }

      Object.keys(preProcess[step]).forEach(key => {
        if (preProcess[step][key] === undefined) {
          preProcess[step][key] = null;
        }
      });

    });


    //
    let model = {
      team_name: preProcess.step1.teamname || "",
      team_drive_link: preProcess.step1.link,
      created_at: new Date().toISOString(),
      member01: { ...preProcess.step2 },
      member02: { ...preProcess.step3 },
      member03: { ...preProcess.step4 },
      member04: { ...preProcess.step5 },
    };

    console.log(model);

    let documentID = model.team_name.trim();

    // Check if team exists
    const { data: existingTeams } = await supabase
      .from('team_name_2025')
      .select('team_name')
      .eq('team_name', documentID);

    if (existingTeams && existingTeams.length > 0) {
      console.log("Given team name already exists!");
      throw new Error("Given team name already exists!");
    }

    // Insert new team
    const { data, error } = await supabase
      .from('team_name_2025')
      .insert([{ id: documentID, ...model }])
      .select();

    if (error) throw error;
    console.log("Team registered successfully!");

    return data;
  } catch (error) {
    console.error("Error saving data: ", error);
    new Error("Team registration failed");
  }
};

const checkTeamExists = async (teamName) => {
  try {
    const { data } = await supabase
      .from('team_name_2025')
      .select('team_name')
      .eq('team_name', teamName);
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Error checking team existence:', error);
    return false;
  }
};


const validateFileUpload = (_, value) => {
  if (!value || value.length === 0) {
    return Promise.reject(new Error("Please upload a profile image."));
  }
  return Promise.resolve();
};

const validateName = (_, value) => {
  if (!value || value.trim() === "") {
    return Promise.reject(new Error("Name is required."));
  }
  if (value.length < 10) {
    return Promise.reject(
      new Error("Name must be at least 10 characters long.")
    );
  }
  const namePattern = /^[A-Za-z\s]+$/;
  if (!namePattern.test(value)) {
    return Promise.reject(
      new Error("Name must contain only letters and spaces.")
    );
  }
  return Promise.resolve();
};

const validateTeamName = async (_, value) => {
  if (value) {
    const exists = await checkTeamExists(value.trim());
    if (exists) {
      return Promise.reject(new Error("Team name already exists!"));
    }
  }
  return Promise.resolve();
};

const validateEmail = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Email is required."));
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return Promise.reject(new Error("Invalid email format."));
  }
  return Promise.resolve();
};

const validateUniId = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("University ID is required."));
  }
  const uniIdPattern = /^[A-Za-z]{2}\d{8}$/;
  if (!uniIdPattern.test(value)) {
    return Promise.reject(
      new Error(
        "SLIIT ID must be exactly 10 characters long, starting with 2 letters followed by 8 numbers."
      )
    );
  }
  return Promise.resolve();
};

const validateContact = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Contact number is required."));
  }
  const contactPattern = /^\d{10}$/;
  if (!contactPattern.test(value)) {
    return Promise.reject(
      new Error("Contact number must be exactly 10 digits.")
    );
  }
  return Promise.resolve();
};

const validateURL = (rule, value) => {
  if (value) {
    try {
      new URL(value);
    } catch (e) {
      return Promise.reject(new Error("Invalid URL ! Please enter correct URL"));
    }
  }
  return Promise.resolve();
};

export {
  validateTeamName,
  handleUpload,
  validateFileUpload,
  validateName,
  validateEmail,
  validateUniId,
  validateContact,
  registerTeam,
  checkTeamExists,
  validateURL
};
