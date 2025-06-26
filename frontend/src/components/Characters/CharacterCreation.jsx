import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CCPage.css';
import { createCharacter } from '../../store/characters';

function CreateCharacter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [race, setRace] = useState("Human");
  const [className, setClassName] = useState("");
  const [backstory, setBackstory] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [characterImages, setCharacterImages] = useState(["", "", "", "", ""]);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const imageUrls = [previewImage, ...characterImages.filter((img) => img.trim() !== "")];

    const characterData = {
      name,
      race,
      className,
      backstory,
    };

    return dispatch(createCharacter(characterData,imageUrls))
      .then((newCharacter) => {
        if (newCharacter?.id) navigate(`/characters/${newCharacter.id}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      });
  };

  const handleDemoCharacter = () => {
    setName("Jon Snow");
    setRace("Human");
    setClassName("Swordsmen");
    setBackstory(" He truly knows nothing about the ways of the world.");
    setPreviewImage("https://i.pinimg.com/736x/f0/8c/e4/f08ce4a4ca02719ad1961c6f099b763a.jpg");
    setCharacterImages(["https://i.pinimg.com/736x/f0/8c/e4/f08ce4a4ca02719ad1961c6f099b763a.jpg"])
  };

  return (
    <div className='create-character'>
      <button type='button' id='demo-char-btn' onClick={handleDemoCharacter}>Demo Character</button>
      <h1>Create a Character</h1>

      <form onSubmit={handleSubmit}>
        <div className='form-section'>
          <label>Name
            {errors.name && <p className='errormsg'>{errors.name}</p>}
            <input
              type='text'
              value={name}
              placeholder='Character name'
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>Race
            {errors.race && <p className='errormsg'>{errors.race}</p>}
            <input
            type='text'
              value={name}
              placeholder='Race'
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>Class
            {errors.className && <p className='errormsg'>{errors.className}</p>}
            <input
              type='text'
              value={className}
              placeholder='Class name'
              onChange={(e) => setClassName(e.target.value)}
            />
          </label>

          <label>Backstory
            {errors.backstory && <p className='errormsg'>{errors.backstory}</p>}
            <textarea
              value={backstory}
              placeholder='Brief backstory...'
              onChange={(e) => setBackstory(e.target.value)}
            />
          </label>

          <label>Portrait URL
            {errors.portrait && <p className='errormsg'>{errors.portrait}</p>}
            <input id='previmage'
              type="text"
              placeholder='Preview Image URL'
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              
              />
         
          </label>
          {characterImages.map((image, index) => (
            <label key={index} className='inputs'>
              <input id='imgs'
                type="text"
                placeholder={`Image URL ${index + 1}`}
                value={image}
                onChange={(e) => {
                  const updatedImages = [...characterImages];
                  updatedImages[index] = e.target.value;
                  setCharacterImages(updatedImages);
                }}
                />
            </label>
          ))}

          <button id='create-character-btn' type='submit'>Create Character</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCharacter;
