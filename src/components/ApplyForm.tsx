import React, { ChangeEvent} from 'react'
import Container from 'react-bootstrap/Container';
import { ErrorMessage, Formik, Field } from "formik";
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { appliedForm } from './slices/appliedSlice';
import { setFormValues, richTextValue} from './slices/formvalueSlice';
import { useParams } from 'react-router-dom'
import CustomCKEditor from './CustomCKEditor';
import TurndownService from 'turndown';
import Button from 'react-bootstrap/Button';
import CustomSelect from './CustomSelect';
import { AppDispatch } from './store';

interface RouteParams extends Record<string, string | undefined> {
    id?: string | undefined 
}
const ApplyForm:React.FC= () => {

    const turndownService = new TurndownService();

    const { id } = useParams<RouteParams>();
    const navigate = useNavigate()
    const ApplyDispatch = useDispatch<AppDispatch>();
    const valueDispatch = useDispatch<AppDispatch>()

    const loginSchema = Yup.object().shape({
        First_name: Yup.string().required('Required'),
        Last_name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email Adress').required('Required'),
        option: Yup.array().min(1, 'Select at least one fruit').required('Required'),
        content: Yup.string().required('Content is required'),
    })

    const options = [
        { value: "HTML", label: "HTML" },
        { value: "css", label: "css" },
        { value: "javascript", label: "javascript" },
        { value: "Angular", label: "Angular" },
        { value: "React", label: "React" },
        { value: "AWS", label: "AWS" },
        { value: "Agile Development", label: "Agile Development" },
        { value: "UI/UX design", label: "UI/UX design" },
        { value: "Data Analysis", label: "Data Analysis" },
        { value: "Data Entry", label: "Data Entry" },
    ]

    const stripHtmlTags = (html:string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const handleBack = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        navigate('/')
    }
    return (
        <div>
            <Container style={{ marginTop: "30px" }}>
                <h4>{id}</h4>
                <Formik
                    initialValues={{ First_name: '', Last_name: '', email: '', option: [], content: '' }}
                    validationSchema={loginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const markdownContent = turndownService.turndown(values.content);
                        console.log('Markdown content:', markdownContent);
                       
                        const plainTextContent = stripHtmlTags(values.content);
                        console.log(values, plainTextContent)
                        ApplyDispatch(appliedForm(id ?? 'default-id'))
                        valueDispatch(setFormValues(([values] )))
                        valueDispatch(richTextValue(plainTextContent))
                        alert("Your application has been submitted successfully")
                        navigate("/")
                        setSubmitting(false)
                    }}
                >
                    {({  handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Firstname" className="form-label">Firstname</label>
                                <Field type='First_name' name='First_name' className="form-control"></Field>
                                <ErrorMessage name='First_name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Lastname" className="form-label">Lastname</label>
                                <Field type='Last_name' name='Last_name' className="form-control"></Field>
                                <ErrorMessage name='Last_name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <Field type='email' name='email' className="form-control"></Field>
                                <ErrorMessage name='email' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="skills" className="form-label">Select the skills</label>
                                <CustomSelect
                                    name="option"
                                    label="Select fruits"
                                    options={options}
                                />
                                <ErrorMessage name='option' />
                            </div>
                            <div>
                                <label htmlFor="aboutme" className="form-label">About Me</label>
                                <CustomCKEditor
                                    name="content"
                                    label="Content"
                                />
                               
                                <ErrorMessage name='content' />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                            <Button variant="secondary" onClick={() => handleBack} className="ml-2 btnDetails">
                                Back
                            </Button>
                        </form>
                    )}
                </Formik>
            </Container>
        </div>
    )
}

export default ApplyForm
