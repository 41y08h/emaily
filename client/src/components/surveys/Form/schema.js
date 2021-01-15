import Joi from "joi";

export const fields = [
  {
    label: "Survey Title",
    name: "title",
  },
  {
    label: "Survey Line",
    name: "subject",
  },
  {
    label: "Body",
    name: "body",
  },
  {
    label: "Recipients",
    name: "recipients",
  },
];

export default Joi.object({
  [fields[0].name]: Joi.required().label(fields[0].label),
  [fields[1].name]: Joi.required().label(fields[0].label),
  [fields[2].name]: Joi.required().label(fields[0].label),
});
