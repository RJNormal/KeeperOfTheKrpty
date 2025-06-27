import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacterByIdThunk, updateCharacterThunk } from '../../store/characters';
import './CCPage.css';

function CharacterEditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const character = useSelector(state => state.characters.byId[+id]);

  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [className, setClassName] = useState('');
  const [backstory, setBackstory] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [characterImages, setCharacterImages] = useState(['', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (!character) {
      dispatch(getCharacterByIdThunk(id));
    } else {
      setName(character.name || '');
      setRace(character.race || '');
      setClassName(character.className || '');
      setBackstory(character.backstory || '');
      setPreviewImage(character.previewImage || '');


      if (character.CharacterImages && character.CharacterImages.length > 0) {
        const images = character.CharacterImages.map(img => img.url);
        const paddedImages = [...images, ...Array(5 - images.length).fill('')].slice(0,5);
        setCharacterImages(paddedImages);
      } else {
        setCharacterImages(['', '', '', '', '']);
      }
      setLoading(false);
    }
  }, [dispatch, id, character]);

  if (loading) return <p>Loading character data...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

   
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!race.trim()) newErrors.race = 'Race is required';
    if (!className.trim()) newErrors.className = 'Class is required';
    if (backstory.length > 1000) newErrors.backstory = 'Backstory must be under 1000 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    const imageUrls = [previewImage, ...characterImages.filter(img => img.trim() !== '' && img !== previewImage)];

    const characterData = { name, race, className, backstory };

    dispatch(updateCharacterThunk(id, characterData, imageUrls))
      .then((updatedCharacter) => {
        if (updatedCharacter?.id) {
          navigate(`/characters/${updatedCharacter.id}`);
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      });
  };

  return (
    <div className='create-character'>
      <h1>Edit Character</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-section'>
          <label>Name
            {errors.name && <p className='errormsg'>{errors.name}</p>}
            <input
              type='text'
              value={name}
              placeholder='Character name'
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
          </label>

          <label>Race
            {errors.race && <p className='errormsg'>{errors.race}</p>}
            <input
              type='text'
              value={race}
              placeholder='Race'
              onChange={(e) => setRace(e.target.value)}
              maxLength={50}
            />
          </label>

          <label>Class
            {errors.className && <p className='errormsg'>{errors.className}</p>}
            <input
              type='text'
              value={className}
              placeholder='Class name'
              onChange={(e) => setClassName(e.target.value)}
              maxLength={50}
            />
          </label>

          <label>Backstory
            {errors.backstory && <p className='errormsg'>{errors.backstory}</p>}
            <textarea
              value={backstory}
              placeholder='Brief backstory...'
              onChange={(e) => setBackstory(e.target.value)}
              maxLength={1000}
              rows={6}
            />
          </label>

          <label>Portrait URL
            {errors.portrait && <p className='errormsg'>{errors.portrait}</p>}
            <input
              type="text"
              placeholder='Preview Image URL'
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </label>

          {characterImages.map((image, index) => (
            <label key={index} className='inputs'>
              <input
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

          <button id='create-character-btn' type='submit'>Save Changes</button>
          <button type='button' onClick={() => navigate(`/characters/${id}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CharacterEditPage;
