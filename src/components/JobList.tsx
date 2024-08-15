import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface JobInfo {
    'job title': string;
    'name of the company': string;
    'Experience Required': number;
    'Skills Required': string;
    'description': string;
}

const JobList: React.FC = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [title, setTitle]:any = useState<JobInfo | {}>({});

    const jobs: string[] = [
        "Front End developer",
        "Devops Developer",
        "PHP developer",
        "Data Processing Officer",
        "Sales Executive"
    ];

    const handleClose = () => setShow(false);

    const handleShow = (val: string) => {
        const info = (function () {
            switch (val) {
                case "Front End developer":
                    return {
                        'job title': 'Front End Developer',
                        'name of the company': 'Cognizant',
                        'Experience Required': 2,
                        'Skills Required': 'HTML, CSS, ReactJS',
                        'description': 'Develop functional and appealing web and mobile sites and applications with a focus on usability.'
                    };
                case "Devops Developer":
                    return {
                        'job title': 'DevOps Developer',
                        'name of the company': 'Wipro',
                        'Experience Required': 5,
                        'Skills Required': 'Coding and scripting, Communication and collaboration',
                        'description': 'DevOps is the combination of cultural philosophies, practices, and tools that increases an organization ability to deliver applications and services at high velocity.'
                    };
                case "PHP developer":
                    return {
                        'job title': 'PHP Developer',
                        'name of the company': 'HCL',
                        'Experience Required': 1,
                        'Skills Required': 'Ajax, jQuery, MySQL',
                        'description': 'PHP (Hypertext Processor) is a general-purpose scripting language and interpreter that is freely available and widely used for web development.'
                    };
                case "Data Processing Officer":
                    return {
                        'job title': 'Data Processing Officer',
                        'name of the company': 'TCS',
                        'Experience Required': 1,
                        'Skills Required': 'Communication skills, Critical thinking, Data management',
                        'description': 'Provide administrative support for organizing, transferring, processing, and storing data.'
                    };
                case "Sales Executive":
                    return {
                        'job title': 'Sales Executive',
                        'name of the company': 'Accenture',
                        'Experience Required': 1,
                        'Skills Required': 'Problem solving, Negotiate deals, Interpersonal skills',
                        'description': 'Sales executives understand how to communicate with potential business partners about deals and close sales.'
                    };
                default:
                    return {};
            }
        })();

        setTitle(info);
        setShow(true);
    };

    const handleApply = (index: number) => {
        navigate(`/applyForm/${jobs[index]}`);
    };

    const applied = useSelector((state: RootState) => state.applied);

    const handleAppliedJob = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Button clicked");
        navigate('/viewdetails/');
    };

    const filteredJobs = jobs.filter(job =>
        job.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <Container>
                <h1 style={{ textAlign: "center" }}>Job Portal</h1>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <ul>
                    {filteredJobs.map((val, index) => (
                        <div style={{ display: "flex", padding: "30px" }} key={index}>
                            <li
                                style={{ padding: "10px", cursor: "pointer", display: "flex", width: "305px" }}
                                onClick={() => handleShow(val)}
                            >
                                <a href="#">{val}</a>
                            </li>
                            {applied.items[applied.items.length - 1] === val ? (
                                <button
                                    className="applyforjob_btn"
                                    onClick={handleAppliedJob}
                                >
                                    Applied
                                </button>
                            ) : (
                                <button
                                    className="applyforjob_btn"
                                    onClick={() => handleApply(index)}
                                >
                                    Apply For Job
                                </button>
                            )}
                        </div>
                    ))}
                </ul>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title['job title']}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Job Title: {title['job title']}<br />
                        Name of the company: {title['name of the company']}<br />
                        Experience Required: {title['Experience Required']}<br />
                        Skills Required: {title['Skills Required']}<br />
                        Job Description: {title['description']}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default JobList;
