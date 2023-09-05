import React from 'react'

const SimplePopper = () => {
    return (
        <Tooltip
            arrow
            sx={{ fontSize: '1.3rem' }}
            title={
                customers.find(customer => customer.id === row?.customer_id)?.phone
            } placement="top">
            <span variant='span' sx={{ fontSize: '1.3rem' }}>
                {customers.find(customer => customer.id === row?.customer_id)?.name}
            </span>
        </Tooltip>
    )
}

export default SimplePopper