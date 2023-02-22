import React, { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
} from "@mui/material";


function ProductCard({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat
}) {


  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem"
      }}
    >

      <CardContent>

        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom>
          {category}
        </Typography>

        <Typography
          variant='h5'
          component='div'>
          {name}
        </Typography>

        <Typography
          sx={{ mb: '1.5rem' }}
          color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>

        <Rating value={rating} readOnly />

        <Typography variant='body2'>
          {description}
        </Typography>

        <CardActions>
          <Button
            sx={{ marginLeft: '-1.5rem' }}
            variant='primary'
            size='small'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            see More
          </Button>
        </CardActions>

        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300]
          }}
        >

          <CardContent
            sx={{ marginLeft: '-1rem' }}>
            <Typography>id: {_id}</Typography>
            <Typography>Supply Left: {supply}</Typography>
            <Typography>Yearly Sales This Year: {stat[0].yearlySalesTotal}</Typography>
            <Typography>Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}</Typography>
          </CardContent>

        </Collapse>

      </CardContent>

    </Card>
  )
}

export default ProductCard