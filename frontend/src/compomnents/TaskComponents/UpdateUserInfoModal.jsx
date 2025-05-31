import React, { useRef, useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {  useDispatch, useSelector } from 'react-redux'
import { updateUserInfo } from '../../redux/actions/UserActions'
import { closeModal } from '../../redux/actions/ModalAction'
import userimg from '../../assets/user.png'
function UpdateUserInfoModal({ user }) {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  
    const [previewImage, setPreviewImage] = useState(user?.profile_img_url || userimg);
    const LARAVEL_SERVER = import.meta.env.VITE_LARAVEL_BASE_URL;
    const profilePic = `${LARAVEL_SERVER}/${user.profile_img_url}`;

    useEffect(() => {
    
      if (user?.profile_img_url) {
        setPreviewImage(profilePic);
      } else {
        setPreviewImage(userimg);
      }
  
    
      reset({
        name: user.name ,
      });
    }, [user]);
  
    const handleCloseModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(closeModal());
      }
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setValue("profile_img_url", file); 
      }
    };
  
    const onSubmit = async (data) => {
      if (!user || !user.id) {
        console.error("User not found.");
        return;
      }
  
      const updatedData = {
        ...data,
        id: user.id,
      };
  
      console.log("Form data:", updatedData);
      dispatch(updateUserInfo(updatedData));
      dispatch(closeModal());
    };
  
    return (
      <div
        onClick={handleCloseModal}
        className='z-50 Modal overflow-hidden absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-[#1f1b1b6b]'
      >
        <section
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className='bg-white dark:bg-dark w-1/2 !rounded-lg'
        >
          <div className='w-full !mt-5 flex justify-center'>
            <h1 className='text-2xl dark:text-textDark font-bold'>Update User Info</h1>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)} className='flex dark:text-textDark flex-col gap-4 !p-8'>
            <div className='flex flex-col gap-1'>
              {/* Image Upload */}
              <div className="flex justify-center mt-6">
                <div className="relative w-[120px] h-[120px]">
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border-4 border-gray-300"
                  />
                  <label
                    htmlFor="profile_image"
                    className="absolute bottom-0 right-0 bg-[#3aafae] text-white !p-2 !rounded-full cursor-pointer shadow-md hover:bg-[#2e8d8c] transition"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <input
                      id="profile_image"
                      type="file"
                      accept="image/*"
                      {...register("profile_img_url")}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
  
              {/* Name */}
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 rounded-md !px-3 !py-2"
              />
            </div>
  
            <button
              type="submit"
              className="!mt-6 !py-2 !px-4 bg-blue-600 text-white !rounded-md hover:bg-blue-700 transition"
            >
              Update Info
            </button>
          </form>
        </section>
      </div>
    );
  }
  
  export default UpdateUserInfoModal  