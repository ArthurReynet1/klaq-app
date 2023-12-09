import { Button, SettingsNavbar, TextField } from "components";
import { useFormik } from "formik";
import { PageLayout } from "layouts";
import { useIntl } from "react-intl";
import { initialValues, validationSchema } from "./form";
import { PublicInformationSkeleton } from "../Profile/Skeleton";

export const BankAccount = () => {
  const intl = useIntl();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(values);
    },
  });
  return (
    <PageLayout>
      <SettingsNavbar />
      <div className="space-y-8 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {intl.formatMessage({
                id: "settings.bank-account.header",
              })}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {intl.formatMessage({
                id: "settings.bank-account.description",
              })}
            </p>
          </div>

          {false ? (
            <PublicInformationSkeleton />
          ) : (
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white shadow-sm border sm:rounded-xl md:col-span-2"
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <TextField
                      label={intl.formatMessage({
                        id: "settings.bank-account.label.iban",
                      })}
                      placeholder="DE89 3704 0044 0532 0130 00"
                    />
                    {formik.errors.iban?.ibanNumber &&
                    formik.touched.iban?.ibanNumber ? (
                      <p className="mt-2 text-sm text-danger-600">
                        {intl.formatMessage({
                          id: `settings.bank-account.error.iban`,
                        })}
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <TextField
                      label={intl.formatMessage({
                        id: "settings.bank-account.label.bic-swift",
                      })}
                      placeholder="COBADEFFXXX"
                    />
                    {formik.errors.iban?.bicSwift &&
                    formik.touched.iban?.bicSwift ? (
                      <p className="mt-2 text-sm text-danger-600">
                        {intl.formatMessage({
                          id: `settings.bank-account.error.bic-swift`,
                        })}
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <TextField
                      label={intl.formatMessage({
                        id: "settings.bank-account.label.holder",
                      })}
                      placeholder="John Doe"
                    />
                    {formik.errors.iban?.ibanHolderName &&
                    formik.touched.iban?.ibanHolderName ? (
                      <p className="mt-2 text-sm text-danger-600">
                        {intl.formatMessage({
                          id: `settings.bank-account.error.holder`,
                        })}
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <TextField
                      label={intl.formatMessage({
                        id: "settings.bank-account.label.label",
                      })}
                      placeholder="Professionel"
                    />
                    {formik.errors.iban?.label && formik.touched.iban?.label ? (
                      <p className="mt-2 text-sm text-danger-600">
                        {intl.formatMessage({
                          id: `settings.bank-account.error.label`,
                        })}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 flex items-center justify-end gap-x-6 border-t border-gray-900/10 rounded-b-xl px-4 py-4 sm:px-8">
                <Button type="button" variant="text" color="secondary">
                  {intl.formatMessage({
                    id: "settings.button.cancel",
                  })}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="lg"
                >
                  {intl.formatMessage({
                    id: "settings.button.submit",
                  })}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
