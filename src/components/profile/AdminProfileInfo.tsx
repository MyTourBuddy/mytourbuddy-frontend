import { Admin } from "@/schemas/user.schema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const AdminProfileInfo = ({ user }: { user: Admin }) => {
  const { firstName, lastName, email, age, phone } = user;

  const fullName = `${firstName} ${lastName}`;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{fullName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Age</p>
            <p className="font-medium">{age}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p className="font-medium">{phone ? phone : "--"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProfileInfo;
