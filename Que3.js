//Optimized and error free code

import React, { useState,useCallback, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item

//// Using memo here without creating a differnt variable and returning it
const WrappedSingleListItem = memo(({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={()=>{ onClickHandler(index);}}//Created a arrow function to manage the onClickHandler
    >
      {text}
    </li>
  );
});

WrappedSingleListItem.propTypes = {
  index: PropTypes.number.isRequired,//added isRequired as it is neccesary for the user to send it.
  isSelected: PropTypes.bool.isRequired,//added isRequired as it is neccesary for the user to send it.
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
//used memo here without creating a differnt variable and returning it
const WrappedListComponent = memo(({
  items=[]  //Added a default value empty array to items
}) => {

  const [selectedIndex, setSelectedIndex] = useState(); //changed position of selectedIndex with setSelectedIndex
   
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = useCallback(index =>{//Here used useCallBack to use the previous value if their no change in values
   if(selectedIndex!==index) {// O3.Here used if check to check if selected index is not equal to index then only change the state 
    setSelectedIndex(index);
   }
  },
  [setSelectedIndex]);

  return (
    <ul style={{ textAlign: 'left' }}>
      {items?.map((item, index) => (  //added chaining operator in item.map to prevent errors due to null items
        <WrappedSingleListItem
        key={index}  //Added a key value of index to list item
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}  
          isSelected={selectedIndex===index}  //Provided boolean value to isSelected if selected index matches index value
        />
      ))}
    </ul>
  )
});

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({        //changed array to arrayOf ,changed shapeOf to shape
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

export default WrappedListComponent;