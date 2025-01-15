interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  zip_code: string;
}

interface OrderItem {
  item_id: string;
  quantity: number;
  price: number;
  total_price: number;
  name: string;
  size: string;
  color: string;
  personalization: string;
  pack: string;
  box: string;
  image: string;
}

interface PriceDetails {
  subtotal: number;
  shipping_cost: number;
  has_newsletter_discount: boolean;
  newsletter_discount_amount: number;
  final_total: number;
}

interface PaymentDetails {
  method: 'card' | 'cash';
  status: string;
  konnect_payment_url: string;
  completed_at: string;
}

interface OrderStatus {
  status: string;
  shipped_at: string;
  delivered_at: string;
}

interface OrderSubmission {
  order_id: string;
  user_details: UserDetails;
  items: OrderItem[];
  price_details: PriceDetails;
  payment: PaymentDetails;
  order_status: OrderStatus;
}

const sendOrderConfirmationEmail = async (orderData: OrderSubmission): Promise<void> => {
  console.log('Preparing email data for submission:', orderData);
  
  // Format the data according to the expected structure
  const emailData = {
    user_details: orderData.user_details,
    order_id: orderData.order_id,
    items: orderData.items.map(item => ({
      name: item.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      total_price: item.total_price.toString(),
      personalization: item.personalization || 'No',
      pack: item.pack !== 'aucun' ? 'Yes' : 'No',
      box: item.box === 'Avec box' ? 'Yes' : 'No'
    })),
    price_details: {
      subtotal: orderData.price_details.subtotal.toString(),
      shipping_cost: orderData.price_details.shipping_cost.toString(),
      newsletter_discount_amount: orderData.price_details.newsletter_discount_amount.toString(),
      final_total: orderData.price_details.final_total.toString()
    },
    payment: {
      method: orderData.payment.method === 'card' ? 'Credit Card' : 'Cash',
      status: orderData.payment.status === 'completed' ? 'Paid' : 'Pending'
    }
  };

  console.log('Formatted email data:', JSON.stringify(emailData, null, 2));

  try {
    const response = await fetch('https://www.fioriforyou.com/testsmtp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Email API error response:', errorText);
      throw new Error(`Email API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Email confirmation response:', result);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error(`Failed to send confirmation email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const submitOrder = async (orderData: OrderSubmission): Promise<any> => {
  console.log('Submitting order with data:', orderData);

  try {
    // Format items to ensure personalization is properly handled
    const formattedItems = orderData.items.map(item => ({
      ...item,
      pack: item.pack || 'aucun',
      size: item.size || '-',
      personalization: item.personalization && item.personalization !== '' ? item.personalization : '-',
      box: item.box || 'Sans box'
    }));

    const formattedOrderData = {
      ...orderData,
      items: formattedItems
    };

    // Submit the order
    const orderResponse = await fetch('https://respizenmedical.com/fiori/submit_all_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(formattedOrderData),
    });

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      console.error('Order submission error response:', errorText);
      throw new Error(`Order submission failed: ${orderResponse.status} - ${errorText}`);
    }

    const orderResult = await orderResponse.json();
    console.log('Order submission successful:', orderResult);

    // Send confirmation email with properly formatted data
    await sendOrderConfirmationEmail(orderData);
    console.log('Email confirmation sent successfully');

    return orderResult;
  } catch (error) {
    console.error('Error in order process:', error);
    throw error;
  }
};