import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, View, Text, Image, StyleSheet, PDFViewer, pdf } from '@react-pdf/renderer';
import { Helmet } from "react-helmet";

const ReadMore = () => {
  const [readBook, setReadBook] = useState({});

  const { id } = useParams();

  const bookName = { bookName: id };

  useEffect(() => {
    axios.post('https://assigment-11-six.vercel.app/readmore', bookName)
      .then(res => {
        const bookInfo = res.data;
        setReadBook(bookInfo);
      });
  }, [bookName]);

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'semiBold'
    },
    image: {
      width: '50%',
      marginBottom: 10,
    },
  });

  const downloadPDF = () => {
    const blob = pdf(<Document><Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Title: {readBook.name}</Text>
        <Image src={readBook.image} style={styles.image} />
        <Text style={styles.description}>{readBook.description}</Text>
      </View>
    </Page></Document>).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${readBook.name}_details.pdf`;
    a.click();
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 mt-12">
      <Helmet>
                
                <title>Read More</title>
                
            </Helmet>
      <PDFViewer style={{ width: '100%', height: '500px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.title}>Title: {readBook.name}</Text>
              <Image src={readBook.image} style={styles.image} />
              <Text style={styles.description}>{readBook.description}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default ReadMore;
