
// import React, { useEffect, useState } from "react";
// import profileIMg from "/profileimg.png";
// import uplodIcon from "/edit.png";
// import { Form, Input, Tabs, Upload } from "antd";
// import { useGetAdminProfileQuery, useUpdateAdminProfileMutation, useUpdatePasswordAdminProfileMutation } from "../../redux/features/adminProfile/adminProfileApi";
// import { useForm } from "antd/es/form/Form";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";




// const ChangePassword = () => {
//   const [formOne] = useForm()
//   const [formTwo] = useForm()
//   const [ImageFileList, setImageFileList] = useState([]);


//   const [updateAdminProfile] = useUpdateAdminProfileMutation(); // post
//   const [updatePasswordAdminProfile] = useUpdatePasswordAdminProfileMutation(); // post
//   const { data } = useGetAdminProfileQuery()

// const profileData = data?.data
// console.log(profileData)









//   const handleBeforeUpload = () => {

//   };







//   const onFinishTab1 = async (values) => {
//     try {
//       const res = await updateAdminProfile({ name: values?.name }).unwrap()
//       if (res?.status === true) {
//         toast.success(res?.message)
//       }
//     } catch (error) {
//       if (error) {
//         toast.error(error?.data?.error)
//       }
//     }
//   }



//   const onFinishTab2 = async (values) => {
//     const updatePasswordInfo = {
//       current_password: values.current_password,
//       new_password: values.new_password,
//       new_password_confirmation: values.new_password_confirmation
//     }
//     console.log(updatePasswordInfo)
//     try {
//       const res = await updatePasswordAdminProfile(updatePasswordInfo).unwrap()
//       if (res?.status === true) {
//         toast.success(res?.message)
//       }
//     } catch (error) {
//       if (error) {
//         toast.error(error?.data?.error)
//       }
//     }
//   }



//   const onChange = (key) => {
//     console.log(key);
//   };




// const items = [
//   {
//     key: "1",
//     label: "Edit profile",
//     children: (
//       <Form
//         form={formOne}
//         onFinish={onFinishTab1}>

//         {/* name */}
//         <span className="font-semibold font-roboto text-lg block mb-2">
//           Name
//         </span>
//         <Form.Item
//           name="name"
//           className="mb-7"
//         >
//           <Input
//             placeholder="John Doe"
//             className="p-4 border-none  bg-[#ffffff]"
//           />
//         </Form.Item>

//         {/* email */}
//         <span className="font-semibold font-roboto text-lg block mb-2">
//           Email
//         </span>
//         <Form.Item
//           name="email"
//           rules={[{ required: true, message: "Please input your email" }]}
//         >
//           <Input
//             placeholder="example@gmail.com"
//             className="p-4 border-none  bg-[#ffffff]"
//           />
//         </Form.Item>

//         <div className="text-center mt-5">
//           <button type="submit" className="text-white bg-[#ED1C24] font-semibold font-popping text-xl py-2 px-10 rounded-md">
//             Save
//           </button>
//         </div>
//       </Form>
//     ),
//   },

//   {
//     key: "2",
//     label: "Change Password",
//     children: (
//       <Form
//         form={formTwo}
//         onFinish={onFinishTab2}>

//         {/* current password */}
//         <span className="font-semibold font-roboto text-lg block mb-2">
//           Current password
//         </span>
//         <Form.Item
//           name="current_password"
//           rules={[{ required: true, message: "Please input your Current Password" }]}
//           className="mb-7"
//         >
//           <Input.Password
//             placeholder="**********"
//             className="p-4 border-none  bg-[#ffffff]"
//           />
//         </Form.Item>


//         {/* new password */}
//         <span className="font-semibold font-roboto text-lg block mb-2">
//           New password
//         </span>
//         <Form.Item
//           label=""
//           name="new_password"
//           rules={[{ required: true, message: "Please Input New Password" }]}
//           hasFeedback
//         >
//           <Input.Password
//             placeholder="**********"
//             className="p-4 border-none  bg-[#ffffff]"
//           />
//         </Form.Item>

//         {/* confirm password */}
//         <span className="font-semibold font-roboto text-lg block mb-2">
//           Confirm new password
//         </span>
//         <Form.Item
//           name="new_password_confirmation"
//           dependencies={["new_password"]}
//           hasFeedback
//           rules={[
//             { required: true, message: "Please input your confirm new password!" },
//             ({ getFieldValue }) => ({
//               validator(_, value) {
//                 if (!value || getFieldValue('new_password') === value) {
//                   return Promise.resolve();
//                 }
//                 return Promise.reject(new Error('The two passwords do not match!'));
//               },
//             }),
//           ]}
//         >
//           <Input.Password
//             placeholder="**********"
//             className="p-4 border-none  bg-[#ffffff]"
//           />
//         </Form.Item>

//         <div className="text-center mt-5">
//           <button type="submit" className="text-white bg-[#ED1C24] font-semibold font-popping text-xl py-2 px-10 rounded-md">
//             Save
//           </button>
//         </div>
//       </Form>
//     ),
//   },
// ];

//   return (
//     <div>
//       <div className="bg-white mx-52 mt-5 rounded-lg flex flex-col justify-center items-center py-8">
//         <div className="relative">
//           {profileIMg ? (
//             <img src={profileIMg} alt="" className="w-[137px] rounded-full h-[137px] object-cover" />
//           ) : (
//             <img src={profileIMg} alt="" />
//           )}
//           <Upload
//             showUploadList={false}
//             beforeUpload={handleBeforeUpload}
//             accept="image/*"
//           >
//             <button className="w-8 bg-white flex justify-center items-center p-2 shadow-lg rounded-full absolute right-0 bottom-5">
//               <img src={uplodIcon} className="w-5" alt="" />
//             </button>
//           </Upload>
//         </div>
//         <h3 className="font-roboto font-medium text-[30px]">Jhon Doe</h3>
//         <p className="text-[#B1A8A8] font-roboto font-medium text-xl">
//           example@gmail.com
//         </p>
//       </div>

//       <div className="mx-52">
//         <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;


import React, { useEffect, useState } from "react";
import profileIMg from "/profileimg.png";
import uplodIcon from "/edit.png";
import { Form, Input, Tabs, Upload, message } from "antd";
import { useGetAdminProfileQuery, useUpdateAdminProfileMutation, useUpdatePasswordAdminProfileMutation } from "../../redux/features/adminProfile/adminProfileApi";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [formOne] = useForm();
  const [formTwo] = useForm();
  const [imageUrl, setImageUrl] = useState(profileIMg); 

  const [updateAdminProfile] = useUpdateAdminProfileMutation();
  const [updatePasswordAdminProfile] = useUpdatePasswordAdminProfileMutation();
  const { data, refetch } = useGetAdminProfileQuery();
  const profileData = data?.data;




  // upload imag and preview imag function
  useEffect(() => {
    if (profileData) {
      formOne.setFieldsValue({
        name: profileData?.name,
        email: profileData?.email
      });

      // Use server image if available, otherwise keep default
      if (profileData?.image) {
        setImageUrl(profileData.image);
      }
    }
  }, [profileData, formOne]);

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }

    // Create a preview URL for the image
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result); // Update local state immediately
    };

    // Prepare form data for upload
    const formData = new FormData();
    formData.append('image', file);

    // Call the API to update profile image
    updateAdminProfile(formData)
      .unwrap()
      .then(res => {
        if (res?.status === true) {
          refetch();
        }
      })
      .catch(error => {
        toast.error(error?.data?.error);
        setImageUrl(profileData?.image || profileIMg);
      });

    return false;
  };








  const onFinishTab1 = async (values) => {
    try {
      const res = await updateAdminProfile({ name: values?.name }).unwrap();
      if (res?.status === true) {
        toast.success(res?.message);
        refetch()
      }
    } catch (error) {
      if (error) {
        toast.error(error?.data?.error);
      }
    }
  };

  const onFinishTab2 = async (values) => {
    const updatePasswordInfo = {
      current_password: values.current_password,
      new_password: values.new_password,
      new_password_confirmation: values.new_password_confirmation
    };
    try {
      const res = await updatePasswordAdminProfile(updatePasswordInfo).unwrap();
      if (res?.status === true) {
        toast.success(res?.message);
        formTwo.resetFields();
      }
    } catch (error) {
      if (error) {
        toast.error(error?.data?.error);
      }
    }
  };

  const onChange = (key) => {
    console.log(key);
  };



  const items = [
    {
      key: "1",
      label: "Edit profile",
      children: (
        <Form form={formOne} onFinish={onFinishTab1}>
          {/* name */}
          <span className="font-semibold font-roboto text-lg block mb-2">
            Name
          </span>
          <Form.Item name="name" className="mb-7">
            <Input placeholder="John Doe" className="p-4 border-none bg-[#ffffff]" />
          </Form.Item>

          {/* email */}
          <span className="font-semibold font-roboto text-lg block mb-2">
            Email
          </span>
          <Form.Item name="email">
            <Input
              placeholder="example@gmail.com"
              className="p-4 border-none bg-[#ffffff]"
              disabled
            />
          </Form.Item>

          <div className="text-center mt-5">
            <button type="submit" className="text-white bg-[#ED1C24] font-semibold font-popping text-xl py-2 px-10 rounded-md">
              Save
            </button>
          </div>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      children: (
        <Form
          form={formTwo}
          onFinish={onFinishTab2}>

          {/* current password */}
          <span className="font-semibold font-roboto text-lg block mb-2">
            Current password
          </span>
          <Form.Item
            name="current_password"
            rules={[{ required: true, message: "Please input your Current Password" }]}
            className="mb-7"
          >
            <Input.Password
              placeholder="**********"
              className="p-4 border-none  bg-[#ffffff]"
            />
          </Form.Item>


          {/* new password */}
          <span className="font-semibold font-roboto text-lg block mb-2">
            New password
          </span>
          <Form.Item
            label=""
            name="new_password"
            rules={[{ required: true, message: "Please Input New Password" }]}
            hasFeedback
          >
            <Input.Password
              placeholder="**********"
              className="p-4 border-none  bg-[#ffffff]"
            />
          </Form.Item>

          {/* confirm password */}
          <span className="font-semibold font-roboto text-lg block mb-2">
            Confirm new password
          </span>
          <Form.Item
            name="new_password_confirmation"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please input your confirm new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="**********"
              className="p-4 border-none  bg-[#ffffff]"
            />
          </Form.Item>

          <div className="text-center mt-5">
            <button type="submit" className="text-white bg-[#ED1C24] font-semibold font-popping text-xl py-2 px-10 rounded-md">
              Save
            </button>
          </div>
        </Form>
      ),
    },
  ];


  return (
    <div>
      <div className="bg-white mx-52 mt-5 rounded-lg flex flex-col justify-center items-center py-8">

        {/* image upload component */}
        <div className="relative">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-[137px] rounded-full h-[137px] object-cover"
            onError={(e) => {
              e.target.src = profileIMg; // Fallback if image fails to load
            }}
          />
          <Upload
            showUploadList={false}
            beforeUpload={handleBeforeUpload}
            accept="image/*"
          >
            <button className="w-8 bg-white flex justify-center items-center p-2 shadow-lg rounded-full absolute right-0 bottom-5">
              <img src={uplodIcon} className="w-5" alt="Upload" />
            </button>
          </Upload>
        </div>


        <h3 className="font-roboto font-medium text-[30px]">{profileData?.name || 'John Doe'}</h3>
        <p className="text-[#B1A8A8] font-roboto font-medium text-xl">
          {profileData?.email || 'example@gmail.com'}
        </p>
      </div>

      <div className="mx-52">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default ChangePassword;