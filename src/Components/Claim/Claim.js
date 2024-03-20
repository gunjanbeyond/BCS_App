import React, { useState, useRef, useEffect } from "react";
import { enableRipple } from '@syncfusion/ej2-base';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent, highlightSearch } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent, RadioButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { heightProperty } from "@syncfusion/ej2/office-chart";
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
  ThumbnailView, Print, TextSelection, Annotation, TextSearch, FormFields, FormDesigner, Inject, HighlightSettings
} from '@syncfusion/ej2-react-pdfviewer';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import './Claim.css';
import config from '../../config';

enableRipple(true);





const Claim = () => {

  const baseURL = config.baseURL;
  const serviceUrl = config.PDFViewerServiceUrl;
  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);


  let imgObj = React.useRef(null);
  const [documentPath, setDocumentPath] = useState('');
  let headerText = [{ text: "CLAIM" }, { text: "BOOMI API" }, { text: "INSURANCE" }, { text: "DOCTOR" }, { text: "SALES ORDER" }, { text: "BENEFITS" }, { text: "AUTHORIZATION" }, { text: "BILLING" }, { text: "STATUS" }, { text: "NOTES" }, { text: "DOC ANALYSIS" }];
  let imageEditorToolbar = ['Annotate', "Line", "Rectangle", "Text", 'ZoomIn', 'ZoomOut', { text: 'Custom' }];
  const path = {
    saveUrl: baseURL + 'Claims/PostDocument'
  };
  const inputRef = useRef(null);
  const BhoomiAPIResponseRef = useRef(null)
  const formData = useRef({
    lastName: '',
    middleInitial: '',
    firstName: '',
    dob: '',
    gender: '',
    patientPay: false,
    skilledNursing: false,
    facility: '',
    originalBTPatient: '',
    finalBTPatient: '',
    billedBTPatient: '',
    suffix: '',
    BhoomiAPIValue: '',
    BhoomiAPIResponse: '',
    PDFSearchText: ''
  });
  let viewer;
  const [fileSelected, setFileSelected] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [apiData, setApiData] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(true);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [base64FileData, setbase64FileData] = useState('');
  const [pdfFileWidth, setpdfFileWidth] = useState('');
  const [pdfFileHeight, setpdfFileHeight] = useState('');

  const searchSettings = {
    caseSensitive: true,
    wholeWordSearch: true,
    highlight: true,
  };

  const suffixDataSource = [
    { text: 'Jr', value: 'jr' },
    { text: 'Sr', value: 'sr' },
    { text: 'II', value: 'two' },
    { text: 'III', value: 'three' },
    { text: 'IV', value: 'four' },
  ];

  const facilityDataSource = [
    { text: 'Bushwick Center for Rehabilitation and Nursing', value: 'Bushwick' },
    { text: 'Crown Heights Center for Nursing and Rehabilitation', value: 'Crown' },
    { text: 'Four Seasons Nursing and Rehabilitation Center', value: 'Four' },
    { text: 'Hopkins Center for Rehabilitation and Healthcare', value: 'Hopkins' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    formData.current[name] = value;
  };

  const handleDropdownChange = (e, dropdownName) => {
    const selectedValue = e.value;
    formData.current[dropdownName] = selectedValue;
  };

  const handleRadioChange = (e) => {

    const { name, value } = e.target;
    formData.current[name] = value;
  };

  const handleCheckboxChange = (args, checkBoxName) => {
    const checked = args.checked;
    formData.current[checkBoxName] = checked;
  };

  const handleDateChange = (e) => {

    const today = new Date();
    const birthDate = new Date(e.value);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    inputRef.current.value = age;

  }

  const handleTextBoxChange = (e) => {

    setTextBoxValue(e.target.value);
  };

  const SubmitBhoomiAPI = async () => {

    var strVal = formData.current.undefined;
    const response = await fetch(baseURL + "Boomi/SaveOrder", {
      method: 'POST',
      body: strVal,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const responseData = await response.json();
      setApiData(responseData);

    } else {
      console.error('Error:', response.responseMessage);
    }

  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(baseURL + "Claims/CreateClaim", {
      method: 'POST',
      body: JSON.stringify(formData.current),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      alert('Claim saved successfully.');
      document.getElementById('claimForm').reset();
    }
    else {
      alert('Error while saving Claim form.');
    }

  };


  const toolBarupdate = (args) => {

  }



  const imageEditorCreated = () => {

  }

  let uploadedFileUrl;
  async function readFile(evt) {
    let uploadedFiles = evt.target.files;
    let uploadedFile = uploadedFiles[0];
    setFileSelected(uploadedFile);
    let fileName = uploadedFile.name;
    let reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    let uploadedFileName = fileName;
    reader.onload = async function (e) {
      uploadedFileUrl = e.currentTarget.result;
      // setbase64FileData(e.currentTarget.result);

      if (uploadedFile.type === 'image/tiff') {

      }
      else {
        if (uploadedFile.type === 'application/pdf') {
          setDocumentPath(uploadedFileUrl);
          setShowPDFViewer(true);
          setShowImageViewer(false);
          //viewer.downloadFileName = viewer.fileName = uploadedFileName;
        }
        else {

          setShowPDFViewer(false);
          setShowImageViewer(true);
          if (showImageViewer) {

            imgObj.current.open(uploadedFileUrl);

          }

        }
      }
    };

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await fetch(baseURL + 'Claims/PostDocument', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const responseData = await response.json();
      if (uploadedFile.type === 'image/tiff') {
        if (response != null && response.ok) {
          setbase64FileData(responseData.fileContent);
          setDocumentPath(responseData.fileBase64);
          setShowPDFViewer(true);
          setShowImageViewer(false);
        }
      }
      setbase64FileData(responseData.fileContent);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }

  }

  const documnetLoad = (args) => {
    console.log(args);
    var pageWidth = JSON.parse(args.pageData);
    // setpdfFileWidth = pageWidth.pageSizes[0].width;
    // setpdfFileHeight =pageWidth.pageSizes[0].height;
  }
  const textSearchHighlight = (args) => {

    var viewer = document.getElementById('container').ej2_instances[0];
    viewer.deleteAnnotations();
    var pageNumber = args.pageNumber;
    var bounds = args.bounds;
    viewer.annotation.addAnnotation('Highlight', {
      bounds: [
        {
          x: bounds.left,
          y: bounds.top,
          width: bounds.width,
          height: bounds.height,
        },
      ],
      pageNumber: pageNumber,
    });
  }

  const PerformOCR = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fileStreamToSearch", base64FileData);

    const response = await fetch(baseURL + "Claims/PerformeOCR", {

      method: 'POST',
      body: JSON.stringify({ FileStreamToSearch: base64FileData }), // Use JSON.stringify to serialize the object
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      }

    });
    const responseData = await response.json();

    if (response.ok) {

      setDocumentPath(responseData.fileBase64);
      setShowPDFViewer(true);
      setShowImageViewer(false);
      alert('ocr done');
    }

  }

  function created() {

    if (uploadedFileUrl) {
      imgObj.current.open(uploadedFileUrl);
    }

  }


  const performOCR2 = () => {
    alert("test")
    viewer.deleteAnnotations();


    var word;
    // var xval = 694/1.5;
    // var yval = 170/1.5;
    //895 425 976 460 - 1525
    if (formData.current.PDFSearchText === 'Patient' || formData.current.PDFSearchText === 'patient') {

      var word = '372 410 427 427';
      var wordBox = word.split(' ');

      var xVal = parseFloat(wordBox[0] / 1.5);
      var yVal = parseFloat(wordBox[1] / 1.5);
      var widthVal = parseFloat(xVal);
      var heightVal = parseFloat(wordBox[3]) - yVal;
      viewer.annotation.addAnnotation("Highlight", {
        bounds: [{ x: xVal, y: yVal, width: 40, height: 25 }],
        pageNumber: 0,
      }
      );

      var word1 = '64 252 123 270'
      var wordBox1 = word1.split(' ');

      xVal = parseFloat(wordBox1[0] / 1.5);
      yVal = parseFloat(wordBox1[1] / 1.5);
      widthVal = parseFloat(xVal);
      heightVal = parseFloat(wordBox1[3]) - yVal;
      viewer.annotation.addAnnotation("Highlight", {
        bounds: [{ x: xVal, y: yVal, width: 40, height: 25 }],
        pageNumber: 0,
      }
      );

      word = '65 206 119 226'
      wordBox = word.split(' ');

      xVal = parseFloat(wordBox[0] / 1.5);
      yVal = parseFloat(wordBox[1] / 1.5);
      widthVal = parseFloat(xVal);
      heightVal = parseFloat(wordBox[3]) - yVal;
      viewer.annotation.addAnnotation("Highlight", {
        bounds: [{ x: xVal, y: yVal, width: 40, height: 25 }],
        pageNumber: 0,
      }
      );

      word = '56 410 142 429'
      wordBox = word.split(' ');

      xVal = parseFloat(wordBox[0] / 1.5);
      yVal = parseFloat(wordBox[1] / 1.5);
      widthVal = parseFloat(xVal);
      heightVal = parseFloat(wordBox[3]) - yVal;
      viewer.annotation.addAnnotation("Highlight", {
        bounds: [{ x: xVal, y: yVal, width: 40, height: 25 }],
        pageNumber: 0,
      }
      );
    }
    else if (formData.current.PDFSearchText === '1525') {
      var word = '895 425 976 460';
      var wordBox = word.split(' ');

      var xVal = parseFloat(wordBox[0] / 1.5);
      var yVal = parseFloat(wordBox[1] / 1.5);
      var widthVal = parseFloat(xVal);
      var heightVal = parseFloat(wordBox[3]) - yVal;
      viewer.annotation.addAnnotation("Highlight", {
        bounds: [{ x: xVal, y: yVal, width: 60, height: 25 }],
        pageNumber: 0,
      }
      );
    }
    else if (formData.current.PDFSearchText === 'Kimberly' || formData.current.PDFSearchText === 'kimberly') {
      var word = '694 170 836 212';
      var wordBox = word.split(' ');

      var xVal = parseFloat(wordBox[0] / 1.5);
      var yVal = parseFloat(wordBox[1] / 1.5);
      var widthVal = parseFloat(xVal);
      var heightVal = parseFloat(wordBox[3]) - yVal;
      viewer.annotation.addAnnotation("Highlight", {
        bounds: [{ x: xVal, y: yVal, width: 90, height: 25 }],
        pageNumber: 0,
      }
      );
    }
    else {
      // var word = '663 165 701 179';
    }
    // if (word) {
    //   var wordBox = word.split(' ');

    //   var xVal = parseFloat(wordBox[0] / 1.5);
    //   var yVal = parseFloat(wordBox[1] / 1.5);
    //   var widthVal = parseFloat(xVal);
    //   var heightVal = parseFloat(wordBox[3]) - yVal;
    //   viewer.annotation.addAnnotation("Highlight", {
    //     bounds: [{ x: xVal, y: yVal, width: 60, height: 25 }],
    //     pageNumber: 0,
    //   }
    //   );
    // }
    
  };

  const onFileSuccess = (args) => {

    const response = JSON.parse(args.e.currentTarget.responseText);

    if (response != null && response.fileURL != '' && response.sasToken != '') {
      const blobUrl = response.fileURL;
      const sasToken = response.sasToken;
      const fullUrl = blobUrl + '?' + sasToken;
      fetch(fullUrl)
        .then(response => {

          if (!response.ok) {
            throw new Error(`Failed to fetch : ${response.status} ${response.statusText}`);
          }
          return response.blob();
        })
        .then(blobData => {
          // Convert the Blob data to a data URL
          const objectURL = URL.createObjectURL(blobData);

          if (args.file.type === 'pdf') {
            //PDF
            const newDocumentPath = objectURL;
            setDocumentPath(fullUrl);
            setShowPDFViewer(true);
            setShowImageViewer(false);

          }
          else {
            //IMG
            imgObj.current.open(objectURL);
            setShowPDFViewer(false);
            setShowImageViewer(true);
          }
        })
        .catch(error => {
          console.error('Error fetching image:', error);
        });
    }

  }

  const tabone = () => {
    return <div>
      <div className="row">
        <div className="col-12 mt-1 pe-2">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item claimAccordionItembgcolor">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button claimAccordionButtonCustom" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  PATIENT
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <form id="claimForm">
                    <div className="row">
                      <div className="col-6">
                        <div className="d-flex flex-row gap-3">
                          <div className="row">
                            <div className="col-6">
                              Last Name:
                              <input type="text" className='e-input' name="lastName" value={formData.lastName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-6">
                              Suffix:
                              <DropDownListComponent id="ddlSuffix" name="suffix" dataSource={suffixDataSource} fields={{ text: 'text', value: 'value' }} value={formData.suffix} placeholder="Select" change={(e) => handleDropdownChange(e, 'suffix')} />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column gap-3 mt-2">
                          <div>
                            Middle Initial(s)
                            <input type='text' className='e-input' name='middleInitial' value={formData.middleInitial}
                              onChange={handleChange} />
                          </div>
                          <div>
                            First Name
                            <input type='text' className='e-input' name='firstName' value={formData.firstName}
                              onChange={handleChange} />
                          </div>
                        </div>
                        <div className="d-flex flex-row mt-2">
                          <div className="row mt-2">
                            <div className="col-6">
                              Date Of Birth
                              <DateTimePickerComponent id="datetimepicker" format={"yyyy-MM-dd"} showTodayButton={false}
                                value={formData.current.dob} onChange={handleChange}
                                change={handleDateChange} />

                            </div>
                            <div className="col-6">
                              Age
                              <input type='text' className='e-input' name='age' value={formData.age} ref={inputRef}
                                onChange={handleChange} />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-row mt-3">
                          <div className="row w-100">
                            <div className="col-6">
                              <span>Sex</span>
                              <div className="d-flex flex-row gap-3 mt-2">
                                <RadioButtonComponent label="Male" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleRadioChange} />
                                <RadioButtonComponent label="Female" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleRadioChange} />
                              </div>
                            </div>
                            <div className="col-6 ps-4 d-flex align-items-end">
                              <CheckBoxComponent name="patientPay" checked={formData.patientPay} change={(e) => handleCheckboxChange(e, 'patientPay')} />
                              <span className="mx-2"> Patient Pay </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-column gap-3 mt-3">
                          <div className="mt-2">
                            <CheckBoxComponent name="skilledNursing" checked={formData.skilledNursing} change={(e) => handleCheckboxChange(e, 'skilledNursing')} />
                            <span className="ms-2"> Place of Service Override(31- Skilled Nursing Facility)</span>
                          </div>
                          <div>
                            Select Facility(Skilled Nursing)
                            <DropDownListComponent id="ddlfacility" name="facility" dataSource={facilityDataSource} fields={{ text: 'text', value: 'value' }} value={formData.facility} placeholder="Select" change={(e) => handleDropdownChange(e, 'facility')} />
                          </div>
                          <div>
                            Original BT Patient ID
                            <input type='text' className='e-input' name='originalBTPatient' value={formData.originalBTPatient}
                              onChange={handleChange} />
                          </div>
                          <div>
                            Final BT Patient ID
                            <input type='text' className='e-input' name='finalBTPatient' value={formData.finalBTPatient}
                              onChange={handleChange} />
                          </div>
                          <div>
                            Billed BT Patient ID
                            <input type='text' className='e-input' name='billedBTPatient' value={formData.billedBTPatient}
                              onChange={handleChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-12 mt-5 text-center">
                          <ButtonComponent type="submit" cssClass='createbtn' isPrimary={true}>CREATE CLAIM</ButtonComponent>
                        </div> */}
                  </form>
                </div>
              </div>
            </div>
            {/* <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  PATIENT ADDRESS
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                </div>
              </div>
            </div> */}
            <div className="accordion-item claimAccordionItembgcolor">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button claimAccordionButtonCustom collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  DOCUMENT
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".pdf,.tif, image/*"
                    onChange={readFile.bind(this)} className="form-control newupload"

                  />

                  {/* <UploaderComponent autoUpload={false} multiple={false} asyncSettings={path}
                    onChange={readFile}
                    success={onFileSuccess}
                  ></UploaderComponent> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 text-center">
            <ButtonComponent type="submit" cssClass='createbtn' onClick={handleSubmit} isPrimary={true}>CREATE CLAIM</ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  }

  const tabtwo = () => {
    return <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item claimAccordionItembgcolor">
          <h2 className="accordion-header" id="headingFour">
            <button className="accordion-button claimAccordionButtonCustom" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
              BOOMI API - POST
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="multiline">
                <TextBoxComponent cssClass="multilinePostTxtbox" multiline={true} placeholder='' value={formData.BhoomiAPIValue} onChange={handleChange} />
              </div>
              <div className="my-3">
                <ButtonComponent type="submit" cssClass='createbtn' isPrimary={true} onClick={SubmitBhoomiAPI}>POST</ButtonComponent>
              </div>
              {apiData ? (
                <pre>{JSON.stringify(apiData, null, 2)}</pre>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  }


  return (
    <div>
      <Header />
      <main className="container-fluid claimcontainer">
        <div className="col-8 tabbeditems">
          <div className="row">
            <TabComponent heightAdjustMode='Auto' >
              <TabItemsDirective>
                <TabItemDirective header={headerText[0]} content={tabone} />
                <TabItemDirective header={headerText[1]} content={tabtwo} />
                <TabItemDirective header={headerText[2]} />
                <TabItemDirective header={headerText[3]} />
                <TabItemDirective header={headerText[4]} />
                <TabItemDirective header={headerText[5]} />
                <TabItemDirective header={headerText[6]} />
                <TabItemDirective header={headerText[7]} />
                <TabItemDirective header={headerText[8]} />
                <TabItemDirective header={headerText[9]} />
              </TabItemsDirective>
            </TabComponent>
          </div>
        </div>
        <div className="col-4 imagepdfreaders">

          <div className="d-flex flex-row gap-3">
            <div className="row mt-3">
              <div className="col-8" >
                 
                <span style={{ display: 'inline-flex' }}>
                Search by keyword
                  <input type='text' className='e-input' style={{ margin: '5px' }} name='PDFSearchText' value={formData.PDFSearchText}
                    onChange={handleChange} />
                </span>
              </div>
              <div className="col-4">
                <ButtonComponent type="submit" cssClass='createbtn' onClick={performOCR2} >Search</ButtonComponent>

              </div>
            </div>
          </div>


          <div className="p-1">
            <div className={(showImageViewer ? 'e-img-editor-sample visible' : 'e-img-editor-sample hidden')}>
              <ImageEditorComponent id="image-editor"
                toolbarUpdating={toolBarupdate}
                created={created}
                ref={imgObj} style={{ height: '660px' }}>
              </ImageEditorComponent>
            </div>
            <div className={showPDFViewer ? 'visible' : 'hidden'}>

              <PdfViewerComponent
                ref={(scope) => {
                  viewer = scope;
                }}
                id="container"
                documentPath={documentPath}
                documentLoad={documnetLoad}
                initialRenderPages={10}
                style={{ height: '660px' }}
                enableTextSearch={true}
                textSearchHighlight={textSearchHighlight}
                resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib"
              >
                <Inject
                  services={[
                    Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, BookmarkView, ThumbnailView,
                    Print, TextSelection, TextSearch, FormFields, FormDesigner,]}
                />
              </PdfViewerComponent>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Claim;