import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";

export type TAuthLetterProps = {
  data: {
    today: string;
    companyName: string;
    vat: string;
    accountHolder: string;
    iban: string;
    swift: string;
    bankName: string;
    currency: string;
    logo?: string;
  };
};

const TAuthLetter = ({ data }: TAuthLetterProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {data.logo && <Image src={data.logo} style={styles.logo} />}
          <Text style={styles.headerTitle}>AUTHORIZATION LETTER</Text>
        </View>

        <View style={styles.body}>
          {/* Date */}
          <Text style={styles.date}>{data.today}</Text>

          {/* Body */}
          <Text style={styles.paragraph}>To whom it may concern,</Text>

          <Text style={styles.paragraph}>
            We, <Text style={styles.bold}>{data.companyName}</Text>, with fiscal
            number <Text style={styles.bold}>{data.vat}</Text>, hereby authorize
            <Text style={styles.bold}> Zip Services Online S.L. </Text>
            to make payment to the following account holder and bank details:
          </Text>

          {/* Account Information */}
          <View style={styles.infoBlock}>
            <Text style={styles.field}>
              Company Name: <Text style={styles.value}>{data.companyName}</Text>
            </Text>
            <Text style={styles.field}>
              Fiscal Number: <Text style={styles.value}>{data.vat}</Text>
            </Text>
            <Text style={styles.field}>
              Account Holder:{" "}
              <Text style={styles.value}>{data.accountHolder}</Text>
            </Text>
            <Text style={styles.field}>
              IBAN: <Text style={styles.value}>{data.iban}</Text>
            </Text>
            <Text style={styles.field}>
              SWIFT/BIC: <Text style={styles.value}>{data.swift}</Text>
            </Text>
            <Text style={styles.field}>
              Bank Name: <Text style={styles.value}>{data.bankName}</Text>
            </Text>
            <Text style={styles.field}>
              Currency: <Text style={styles.value}>{data.currency}</Text>
            </Text>
          </View>

          {/* Final Paragraphs */}
          <Text style={styles.paragraph}>
            This authorization is effective from{" "}
            <Text style={styles.bold}>{data.today}</Text> and shall remain valid
            until further notice. We request that all payments owed to{" "}
            <Text style={styles.bold}>{data.companyName}</Text> be transferred
            to the above-mentioned bank account held by{" "}
            <Text style={styles.bold}>{data.accountHolder}</Text>.
          </Text>

          <Text style={styles.paragraph}>
            Please ensure that any future payments or remittances are made
            solely to the designated bank account provided above. In case of any
            changes to this bank account information, we will promptly notify{" "}
            <Text style={styles.bold}>Zip Services Online S.L. </Text>
            and provide updated details accordingly.
          </Text>

          <Text style={styles.paragraph}>
            For verification purposes, this letter is signed and stamped by the
            authorized signatory of
            <Text style={styles.bold}> {data.companyName}</Text>.
          </Text>
        </View>

        <View style={styles.signature}>
          <Text style={styles.signatureText}> Your signature here </Text>
          <View style={styles.signatureBlock}></View>
        </View>
      </Page>
    </Document>
  );
};

export default TAuthLetter;

/*Font.register({
  family: "Nunito",
  src: "https://fonts.google.com/share?selection.family=Nunito:ital,wght@0,200..1000;1,200..1000",
});*/

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f4f6f9",
    fontSize: 12,
    color: "#4e4e4e",
  },
  body: {
    paddingHorizontal: 70,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingVertical: 30,
    marginBottom: 20,
    marginHorizontal: 40,
    borderBottomColor: "#227181",
    borderBottomWidth: 3,
  },
  headerTitle: {
    color: "#1b5a67",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  date: {
    textAlign: "right",
    fontSize: 14,
    marginBottom: 40,
    fontWeight: "bold",
    color: "#227181",
  },
  paragraph: {
    marginBottom: 20,
    lineHeight: 1,
  },
  bold: {
    fontWeight: "bold",
    color: "#4e4e4e",
  },
  infoBlock: {
    marginTop: 10,
    marginBottom: 30,
    padding: 15,
    borderWidth: 2,
    borderColor: "#227181",
    borderRadius: 8,
    backgroundColor: "#f4f6f9",
  },
  field: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#227181",
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "italic",
    color: "#4e4e4e",
    marginLeft: 10,
  },
  signature: {
    display: "flex",
    marginBottom: 10,
    marginLeft: 280,
    marginRight: 50,
    padding: 15,
  },
  signatureText: {
    fontSize: 9,
    fontStyle: "italic",
    fontWeight: "light",
    color: "#666",
    marginBottom: 4,
    textAlign: "center",
  },
  signatureBlock: {
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#227181",
    borderRadius: 8,
    backgroundColor: "#f4f6f9",
    height: 90,
  },
});
