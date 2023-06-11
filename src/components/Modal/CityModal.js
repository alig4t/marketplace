import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

import { IoIosClose } from 'react-icons/io'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { BiCheckbox } from 'react-icons/bi'
import { RiCheckboxFill } from 'react-icons/ri'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi';

import CityListJson from "./city.json"

function CityModal(props) {
  const listDiv = useRef(null);

  const [prevSelected] = useState(((props.currentCity).sort()).join(""))
  const [states, setStates] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState([])
  const [listCityShow, setListCityShow] = useState({
    parentTitle: '',
    counties: [{ "id": 0, "title": "", "parent": 0 }]
  })
  const [clickableBtn, setClickableBtn] = useState(false);

  
  useEffect(() => {
    // console.log(states);
    // console.log(allCity);
    // console.log(selectedCity);
    // console.log(props.currentCity);
    // console.log(prevSelected);
    // console.log(listCityShow);
  })

 

  useEffect(() => {
    let ids = [];
    selectedCity.forEach((city) => {
      ids.push(city.id);
    })
    let newSelectedStr = (ids.sort()).join("");

    if (selectedCity.length === 0 || prevSelected == newSelectedStr) {
      setClickableBtn(false)
    } else {
      setClickableBtn(true)
    }

  }, [selectedCity])

  const backToStates = () => {
    setListCityShow({
      parentTitle: "",
      counties: [...states],
    })
  }

  const showInitialStates = () => {
    let initialstate = [];
    let allCounties = [];
    let selectCityBadgeArray = [];

    CityListJson.map((state) => {
      if (state.parent === 0) {
        initialstate.push({ ...state, checked: false })
      } else {
        let checekdStatus = props.currentCity.includes(state.id) ? true : false
        if (checekdStatus) {
          selectCityBadgeArray.push({ ...state, checked: checekdStatus })
        }
        allCounties.push({ ...state, checked: checekdStatus })
      }
    })
    setListCityShow({
      parentTitle: "",
      counties: [...initialstate],
    });
    setAllCity(allCounties)
    setStates(initialstate)
    setSelectedCity(selectCityBadgeArray)

  }

  const selectedCityListBadge = () => {

  }

  useEffect(() => {
    showInitialStates()
    selectedCityListBadge()
  }, [])

  const searchCityHandler = txt => {

    let allcities = [...allCity]
    if (txt != "") {
      let filteredCities = allcities.filter((item) => {
        if (item.title.indexOf(txt) > -1) {
          return item
        }
      })
      // console.log(filteredCities);
      setListCityShow({
        parentTitle: "",
        counties: [...filteredCities],
      })
    } else {
      setListCityShow({
        parentTitle: "",
        counties: [...states],
      })
    }

  }

  const deleteCityHandler = (id) => {
    let cities = [...selectedCity];
    let allcities = [...allCity]
    let index = cities.findIndex((item) => item.id === id);
    cities.splice(index, 1);
    setSelectedCity(cities);

    let cityIndex = allcities.findIndex(item => item.id === id)
    allcities[cityIndex].checked = false
    setAllCity(allcities);
  }

  const showCountiesHandler = (parentId, parentTitle) => {
    let counties = allCity.filter((state) => {
      return state.parent === parentId
    })
    let parentIndex = states.findIndex((item) => item.id === parentId);
    setListCityShow({
      parentIndex,
      parentId,
      parentTitle,
      counties: [...counties],
      checked: false
    })

    listDiv.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
    // listDiv.current.offsetTop = 0;

  }



  const checkCityHandler = (id, title) => {
    // console.log(parentIndex);
    let checkedCities = [...selectedCity];
    let allcities = [...allCity];
    let copyStates = [...states];
    let index = allcities.findIndex((item) => item.id === id)
    if (allcities[index].checked === true) {
      allcities[index].checked = false;
      let parentId = allcities[index].parent;
      let parentIndex = copyStates.findIndex((city) => city.id === parentId)
      copyStates[parentIndex].checked = false;
      setStates(copyStates)
    } else {
      allcities[index].checked = true;
    }

    let duplicated = checkedCities.some((item) => {
      return item.id === id
    })

    if (!duplicated) {
      checkedCities.push({ id, title })
    } else {
      let indexBadge = checkedCities.findIndex(item => item.id === id);
      checkedCities.splice(indexBadge, 1)
    }

    setSelectedCity(checkedCities)
    setAllCity(allcities)
  }

  const checkAllCities = (parentId, parentIndex) => {
    let allCities = [...allCity]
    let cityIDS = [];
    let copyStates = [...states]
    let selCities = [...selectedCity];
    let newBadges = [];


    listCityShow.counties.forEach((city) => {
      cityIDS.push(city.id)
    })

    // console.log(states[parentIndex].checked);
    if (states[parentIndex].checked == false) {
      allCities.forEach((item) => {
        if (cityIDS.includes(item.id)) {
          if (item.checked == false) {
            newBadges.push(item)
          }
          item.checked = true;
        }
      })
      copyStates[parentIndex].checked = true;
      setSelectedCity([...selCities, ...newBadges])
    } else {
      allCities.forEach((item) => {
        if (cityIDS.includes(item.id)) {
          item.checked = false;
        }
      })
      copyStates[parentIndex].checked = false;
      selCities = selCities.filter((item) => {
        if (!cityIDS.includes(item.id)) {
          return item
        }
      })

      setSelectedCity([...selCities])
    }

    // console.log(cityIDS);
    setAllCity(allCities)
    setStates(copyStates)
    // console.log([...selCities, ...newBadges]);
  }

  useEffect(() => {
    // console.log(selectedCity.length);
    // if (selectedCity.length > 0) {
    //   setClickableBtn(true)
    // } else {
    //   setClickableBtn(false)
    // }
  })

  return (
    <Modal
      show={props.show} onHide={props.close}
      fullscreen="sm-down"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header className='flex-wrap'>
        <Modal.Title id="contained-modal-title-vcenter">
          انتخاب شهر
        </Modal.Title>
        {/* <div class="break"></div> */}
        <div className='city-scrollabe w-100 pt-3'>
          {
            selectedCity.map((item) => {
              return (
                <Badge pill className="dv-citybadge" key={item.id}>
                  {item.title}
                  <span className="dv-deletebadge" onClick={() => deleteCityHandler(item.id)}>
                    <IoIosClose />
                  </span>
                </Badge>
              )
            })
          }
        </div>

        <div className='d-block w-100 mt-3 px-2 position-relative'>
          <Form.Control type="text" className='dv-modalsearch' placeholder="جستجو در شهرها" onChange={e => searchCityHandler(e.target.value)} />
          <span className='dv-search-modal-icon'><BiSearch /></span>
        </div>

      </Modal.Header>
      <Modal.Body className='dv-modal-body overflow-auto'>

        <ListGroup ref={listDiv}>
          {
            (listCityShow.parentTitle != "") ? (
              <>
                <ListGroup.Item onClick={backToStates}><span className='dv-backarrow'><HiOutlineArrowRight /></span>بازگشت به استانها</ListGroup.Item>
                <ListGroup.Item onClick={() => checkAllCities(listCityShow.parentId, listCityShow.parentIndex)}>
                  {" همه شهرهای " + " " + listCityShow.parentTitle}
                  <span className='dv-arrow'>
                    {states[listCityShow.parentIndex].checked ? <RiCheckboxFill /> : <BiCheckbox />}
                  </span>
                </ListGroup.Item>
              </>
            ) : null
          }

          {
            listCityShow.counties.map((item) => {
              return <ListGroup.Item key={item.id}
                onClick={item.parent === 0 ? () => showCountiesHandler(item.id, item.title) : () => checkCityHandler(item.id, item.title)}
              >
                {item.title}
                {
                  item.parent === 0 ? <span className='dv-arrow'><MdKeyboardArrowLeft /></span>
                    : <span className='dv-arrow'>
                      {item.checked ? <RiCheckboxFill /> : <BiCheckbox />}
                    </span>
                }
              </ListGroup.Item>
            })
          }

        </ListGroup>


      </Modal.Body>
      <Modal.Footer>
        <Button variant='light' className='dv-btn-closemodal' onClick={props.close}>انصراف</Button>
        <Button variant={clickableBtn ? "danger" : "light"} className='dv-btn-closemodal not-allowed' onClick={props.close} disabled={clickableBtn ? false : true}>تایید</Button>

      </Modal.Footer>
    </Modal>
  );
}

export default CityModal;