import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../../../config'
import { Autocomplete, Box, Button, Card, CardActionArea, CardContent, Divider, Fab, Grid, Icon, IconButton, Input, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Trash from '@mui/icons-material/Delete';
import ImagePicker from '../utils/ImagePicker';
import ImagesContainer from '../utils/ImagesContinaer';
import ImagePickerCloud from '../utils/ImagePickerCloud';
import DragDropFile from '../utils/DragDropFile';


const FormNewSign = ({ setNewSign, item, setOpenModal }) => {

  const [title, setTitle] = useState(item?.title || '')
  const [description, setDescription] = useState(item?.description || '')
  const [images, setImages] = useState(item?.images || [])
  const [startProject, setStartProject] = useState(item?.startProject || '')
  const [endProject, setEndProject] = useState(item?.endProject || '')
  const [sale, setSale] = useState(item?.sale || 0)
  const [cost, setCost] = useState(item?.cost || 0)
  const [signProducts, setSignProducts] = useState(item?.signProducts || [])
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)


  const saveSign = () => {
    const url = config.api.baseUrl + config.api.signs
    const body = { title, description, images, startProject, endProject, sale, cost, signProducts }
    console.log(url, body)
    axios.post(config.api.baseUrl + config.api.signs,
      body
    )
      .then((response) => {
        console.log(response)
        setNewSign(response.data)
      }).catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setOpenModal(false)
      })
  }

  const updateSing = () => {
    const url = config.api.baseUrl + config.api.signs + '/id/' + item.id
    const body = { title, description, images, startProject, endProject, sale, cost, signProducts }
    console.log(url, body)
    axios.patch(url,
      body
    )
      .then((response) => {
        console.log(response)
        setNewSign(response.data)
        setOpenModal(false)
      }).catch((error) => {
        console.log(error)
      })
  }


  const getProducts = () => {
    const url = config.api.baseUrl + config.api.products
    console.log(url)
    axios.get(url)
      .then((response) => {
        console.log(response)
        setProducts(response.data)
      }
      ).catch((error) => {
        console.log(error)
      }
      ).finally(() => {
        console.log('finally')
      })
  }


  useEffect(() => {
    getProducts()
  }, [])


  console.log(images)


  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: 'white',
        padding: '1rem 2rem',
        height: 'fit-content',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '2rem',
          width: '100%',
          mb: '2rem',
        }}
        flexWrap={'wrap'}
      >

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
          }}
          maxWidth={'500px'}
        >
          <TextField
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='ej: Happy birthday'
            type='text'
          />

          <TextField
            id="outlined-basic"
            label="Descripción"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='ej: Letrero de cumpleaños'
            type='text'
          />


          <TextField
            id="outlined-basic"
            label="Costo"
            variant="outlined"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder='ej: 1000'
            type='number'
          />

          <TextField
            id="outlined-basic"
            label="Precio de venta"
            variant="outlined"
            value={sale}
            onChange={(e) => setSale(e.target.value)}
            placeholder='ej: 2000'
            type='number'
          />

        </Box>


        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            // width: '100%',
          }}
        >

          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
              p: 2
            }}
          >

            <Typography variant='h6'>
              Imagenes
            </Typography>
            <ImagesContainer images={images} setImages={setImages} />
            {/* <ImagePicker setImages={setImages} images={images} /> */}
            {/* <ImagePickerCloud setImages={setImages} images={images} /> */}
            <DragDropFile
              setImages={setImages} images={images}
            />

          </Card>

          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
              p: 2
            }}
          >
            <Typography variant='h6'>
              Productos
            </Typography>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
            }}>
              {
                signProducts?.map((product, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      width: '100%',
                    }}
                  >
                    <Typography variant='h6'>
                      {product?.product?.name}
                    </Typography>
                    <Typography variant='h6'>
                      {product?.quantity}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        const newSignProducts = [...signProducts]
                        newSignProducts.splice(index, 1)
                        setSignProducts(newSignProducts)
                      }}
                    >
                      <Trash />
                    </IconButton>
                  </Box>
                ))
              }
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '1rem',
                width: '100%',
              }}
            >
              {/* <Typography variant='h6'>
              Productos
            </Typography> */}

              <TextField
                sx={
                  {
                    width: '20%',
                  }
                }
                id="outlined-basic"
                label="Cantidad"
                variant="standard"
                value={product?.quantity}
                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                placeholder='ej: 2'
                type='number'
              />

              <Autocomplete
                sx={
                  {
                    width: '100%',
                  }
                }
                // multiple
                id="tags-standard"
                options={products}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setProduct({ ...product, product: value })}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Productos" placeholder='ej: 2000' />
                )}
              />
              <IconButton
                onClick={() => {
                  console.log('addProduct', product)
                  setSignProducts([...signProducts, product])
                  setProduct({ product: null, quantity: null })
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>

            </Box>

          </Card>

        </Box>

      </Box>

      <Button variant="contained"
        onClick={() => {
          item?.id ? updateSing() : saveSign()
        }}
      >
        {item?.id ? 'Actualizar' : 'Guardar'}
      </Button>

    </Card>
  )
}

export default FormNewSign