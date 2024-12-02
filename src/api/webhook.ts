import { BOT } from "../../index";

export default async (req, res) => {
  if (req.method === 'POST') {
    BOT.processUpdate(req.body);
    res.status(200).send('OK');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};