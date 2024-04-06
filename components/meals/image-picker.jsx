"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [image, setimage] = useState(null);
  const imageInput = useRef();

  function handlePickImage() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setimage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setimage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <div className={classes.preview}>
          {image ? (
            <Image src={image} alt="user image" fill />
          ) : (
            <p>
              No image picked yet <br /> <br />
              Please pick a .png or .jpeg
            </p>
          )}
        </div>

        <button
          className={classes.button}
          type="button"
          onClick={handlePickImage}
        >
          Pick your image
        </button>
      </div>
    </div>
  );
}
