import { useState } from 'react';
import './CCPage.css'

const CharacterCreatePage = ({ userId }) => {
  const [form, setForm] = useState({
    name: '',
    race: 'Human',
    class: '',
    portrait: '',
    userId: userId,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const races = ['Human', 'Elf', 'Dwarf'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    //doing fetch for now, change to redux later
    try {
      const res = await fetch('api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'An error occurred');
      } else {
        setSuccessMessage(`Character "${data.name}" created successfully!`);
        setForm({
          name: '',
          race: 'Human',
          class: '',
          portrait: '',
          userId: userId,
        });
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create a Character</h2>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            maxLength={50}
            required
          />
        </label>

        <label>
          Race:
          <select name="race" value={form.race} onChange={handleChange}>
            {races.map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
        </label>

        <label>
          Class:
          <input
            name="class"
            value={form.class}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Portrait URL:
          <input
            name="portrait"
            value={form.portrait}
            onChange={handleChange}
            placeholder="https://example.com/image.png"
          />
        </label>

        <button type="submit">Create Character</button>
      </form>
    </div>
  );
};

export default CharacterCreatePage;