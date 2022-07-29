import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/config';
import Razorpay  from 'razorpay';


const PaymentRouter = Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_eNKosTtMAvrVMJ",
  key_secret: "HZVSspAROCVXS1xqIO5itJT9",
});

const options = {
  amount: 20 * 100,
  currency: "INR",
  receipt: uuidv4(),
  payment_capture: 1,
}

PaymentRouter.post('/order', async (req: Request, res: Response) => {
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (Err) {
    console.log(Err);
    return res.status(500).send("Internal server Error")
  }
})

export default PaymentRouter;