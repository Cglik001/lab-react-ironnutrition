import React, {useState} from 'react'
import foodData from './../foods.json'
import FoodBox from './FoodBox'
import FoodForm from './FoodForm'
import Search from './Search'
import trashIcon from '../images/trash_icon.png';

function Foods() {

  const [foods, setFoods] = useState(foodData)
  const [filtered, setFiltered] = useState(foodData)
  const [showForm, setShowForm] = useState(false)
  const [menu, setMenu] = useState([])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const addFood = newFood => {
    const updatedFoods = [...foods, newFood]
    const updatedFilteredFoods = [...filtered, newFood]

    setFoods(updatedFoods)
    setFiltered(updatedFilteredFoods)
    toggleForm()
  }

  const filterFood = term => {
    const filteredFood = foods.filter(food => {
      return food.name.toLowerCase().includes(term.toLowerCase())
    })
    setFiltered(filteredFood)
  }

  const addToMenu = foodData => {
    const updatedMenu = [...menu]
    const found = menu.find(element => {
      return element.name === foodData.name
    })

    if(found){
      found.quantity += foodData.quantity
      found.calories += foodData.calories
    } else {
        updatedMenu.push(foodData)
    }

    setMenu(updatedMenu)
  }

  const totalCalories = () => {
    return menu.reduce((acc, val) => {
        return acc + val.calories
    }, 0)
  }

  const handleDeleteClick = (e) => {
    const index = e.target.id
    const updatedMenu = [...menu]
    if (index >= 0) {
      updatedMenu.splice(index, 1)
    }
    setMenu(updatedMenu)
  }

  return (
    <div>
      <h1>IronNutrition</h1>
      <button onClick={toggleForm} className='button'>Add Food</button>
      {showForm && <FoodForm  addFood={addFood}/> }
      <Search filterFood={filterFood} />
      <div className="columns">
        <div className="column">

            {filtered.map( food => {
              return <FoodBox food={food} addToMenu={addToMenu}/>
            })}

        </div>
        <div className="column">
          <h2><b>Today's Food</b></h2>
          <ul>
            {
              menu.map((food, index) => {
                return <li>{food.quantity} {food.name} = {food.calories} cal
                <button className='buttonDelete' onClick={handleDeleteClick} style={{marginLeft: '14px', border: 'none', backgroundColor: 'white'}}>
                  <img id={index} src={trashIcon} alt='trashicon' style={{width: '16px', height: '16px', padding: '1px'}}/>
                  </button></li>
              })
            }
          </ul>
          <p><b>Total {totalCalories()} cal</b></p>
        </div>

      </div>

    </div>
  )
}

export default Foods
