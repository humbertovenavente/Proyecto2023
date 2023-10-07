// FilteredSearchComponent.js
import React, { useState } from 'react';

function Filter() {
   const [searchTerm, setSearchTerm] = useState('');
   const [items, setItems] = useState([]);

   const filteredItems = items.filter(item => 
       item.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.title.toLowerCase().includes(searchTerm.toLowerCase())
   );

   // A simple form to add new items
   const [newCategory, setNewCategory] = useState('Deporte');
   const [newSubcategory, setNewSubcategory] = useState('');
   const [newTitle, setNewTitle] = useState('');

   const handleSubmit = () => {
       setItems([...items, { category: newCategory, subcategory: newSubcategory, title: newTitle }]);
       setNewSubcategory('');
       setNewTitle('');
   };

   return (
       <div>
           <input 
               type="text" 
               placeholder="Search..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
           />

           <div>
               <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                   <option value="Deporte">Deporte</option>
                   <option value="Comida">Comida</option>
                   <option value="Tecnologia">Tecnologia</option>
                   {/* Add more categories as needed */}
               </select>

               <input 
                   type="text" 
                   placeholder="Subcategory" 
                   value={newSubcategory}
                   onChange={(e) => setNewSubcategory(e.target.value)}
               />

               <input 
                   type="text" 
                   placeholder="Title" 
                   value={newTitle}
                   onChange={(e) => setNewTitle(e.target.value)}
               />

               <button onClick={handleSubmit}>Add Item</button>
           </div>

           {filteredItems.map(item => (
               <div key={item.title}>
                   <h3>{item.title}</h3>
                   <p>{item.category} - {item.subcategory}</p>
               </div>
           ))}
       </div>
   );
}

export default Filter;

